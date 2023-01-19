import * as React from 'react';
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Pressable, 
  Text, 
  Alert 
} from 'react-native';

import { 
  getRequest, 
  securePutRequest, 
  secureDeleteRequest 
} from '../../security/Api';

import { getCredentials } from '../../security/Credential';

import FormInput from '../../components/input/FormInput';
import BlackPressable from '../../components/button/BlackPressable';
import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';

import styles from '../../style/style';


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
      setStatus(res.status);
      if(res.status != 'Error') {
        setChannelInfo(res.data);
        setChannelDate(formatDate(res.data.channel.created_at))
      }
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
        Alert.alert(res.message)
      }
    });
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }


  React.useEffect(() => {
    userCredential();

    /**
    * CLEAN STATE
    */
    const handleFocus = navigation.addListener('focus', () => {
      getChannelInformations();
    });

    return handleFocus;
  }, [status])


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
        <Text style={styles.pressableWarning}>Vous pouvez consulter la liste des membres présents dans votre groupe. Vous pourrez ainsi en ajouter et/ou en supprimer.</Text>
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
        <Text style={styles.pressableWarningBold}>Attention, cette action est irréversible.</Text> 
        <Text style={styles.pressableWarning}>Le groupe sera définitivement supprimé, tout comme les messages échangés par ses membres...</Text>
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