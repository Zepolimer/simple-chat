import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View, ScrollView, SafeAreaView, Alert } from 'react-native';

import { getRequest, securePutRequest, secureDeleteRequest } from '../../security/Api';
import { getCredentials } from '../../security/Credential';

import styles from '../../style/style';
import FormInput from '../../components/FormInput';
import BlackPressable from '../../components/BlackPressable';
import FixedHeaderGoBack from '../../components/FixedHeaderGoBack';


export default function ChannelSettings({ route, navigation }) {
  const { id } = route.params;
  const { name } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null);
  const [channelInfo, setChannelInfo] = React.useState(null);

  const [channelName, onChangeName] = React.useState('');
  const [channelDate, setChannelDate] = React.useState(null);

  const userCredential = async () => {
    await getCredentials()
    .then((res) => {
      if(res) {
        setAccess(res.access);
        setRefresh(res.refresh);
        setUser(res.user);
      }
    });
  }

  const getChannelInformations = async () => {
    await getRequest(
      `channel/${id}/info`, 
    )
    .then((res) => {
      setChannelInfo(res.data);
      setChannelDate(formatDate(res.data.channel.created_at))
    });
  }

  const updateChannelName = async () => {
    if(channelName != '') {
      let newName = {
        name: channelName,
      }

      await securePutRequest(
        `user/${user}/channel/${id}`,
        newName,
        access,
      )
      .then((res) => {
        console.log(res.data)
        setStatus(res.status);
      });

    }
  }

  const deleteChannel = async () => {
    await secureDeleteRequest(
      `user/${user}/channel/${id}`,
        access,
    )
    .then((res) => {
      if(res.status == 'Success') {
        navigation.navigate('Channels')
      } else {
        Alert.alert('Une erreur est survenue, veuillez réessayer.')
      }
    });
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }


  React.useEffect(() => {
    userCredential();
    getChannelInformations();
  }, [])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />
      {channelInfo != null &&
        <View style={styles.whiteCard}>
          <Text>Le groupe "{channelInfo.channel.name}" à été créée par {channelInfo.creator.firstname} {channelInfo.creator.lastname} le {channelDate}.</Text>
        </View>
      }

      {channelInfo != null &&
        <View style={styles.whiteCard}>
          <Text>Changer le nom du groupe</Text>
          <FormInput
            onChangeText={onChangeName}
            value={channelName != '' ? channelName : channelInfo.channel.name}
            placeholder={channelInfo.channel.name}
            keyboardType="default"
          />
          <BlackPressable 
            title={'Enregistrer'}
            onPress={updateChannelName}
            text={'Enregistrer'}
          />
        </View>
      }

      <View style={styles.whiteCard}>
        <Text style={styles.deletePressableWarning}>Vous pouvez consulter la liste des membres présents dans votre groupe. Vous pourrez ainsi en ajouter et/ou en supprimer.</Text>
        <Pressable
          style={styles.getPressable}
          onPress={() => navigation.navigate('ChannelUsers', {
            id: id,
            name: name,
        })}>
          <Text style={styles.deletePressableText}>Voir les membres</Text>
        </Pressable>
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.deletePressableWarning}>Attention, cette action est irréversible. Le groupe sera définitivement supprimé, tout comme les messages échangés par ses membres...</Text>
        <Pressable 
          style={styles.deletePressable}
          onPress={() => deleteChannel()}
        >
          <Text style={styles.deletePressableText}>Supprimer le groupe</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}