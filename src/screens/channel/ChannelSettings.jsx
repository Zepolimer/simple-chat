import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View, ScrollView, SafeAreaView, Alert } from 'react-native';

import { getRequest } from '../../security/Api';
import { getCredentials } from '../../security/Credential';

import styles from '../../style/style';
import FormInput from '../../components/FormInput';
import BlackPressable from '../../components/BlackPressable';


export default function ChannelSettings({ route, navigation }) {
  const { id } = route.params;
  const { name } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [channelUsers, setChannelUsers] = React.useState(null);
  const [channelName, setChannelName] = React.useState('');

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

  React.useEffect(() => {
    userCredential();
  }, [])


  return (
    <SafeAreaView>
      <Text>Changer le nom du groupe</Text>
      <FormInput 
        onChangeText={setChannelName}
        value={channelName != '' ? channelName : name}
        placeholder={name}
        keyboardType="default"
      />
      <BlackPressable 
        title={'Enregistrer'}
        onPress={() => console.log('ok')}
        text={'Enregistrer'}
      />

      <Pressable onPress={() => navigation.navigate('ChannelUsers', {
        id: id,
        name: name,
      })}>
        <Text>Membres présents dans votre groupe</Text>
      </Pressable>

      <Text>Ajouter des membres</Text>

      <Pressable style={styles.deletePressable}>
        <Text style={styles.deletePressableText}>Supprimer le groupe</Text>
      </Pressable>
    </SafeAreaView>
  )
}