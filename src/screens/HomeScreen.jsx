import * as React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

import { getRequest, secureGetRequest } from '../security/Api';
import { removeCredentials } from '../security/AsyncStorage';
import { getCredentials, regenerateToken } from '../security/Credential';

import styles from '../style/style';


const HomeScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [channels, setChannels] = React.useState(null);

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

  const getUsers = async () => {
    await removeCredentials([
      'access_token', 
      'refresh_token', 
      'user_id'
    ])
    .then((res) => {
      navigation.navigate('Connexion')
    })
  };

  const getAllChannels = async () => {
    await getRequest('channels')
    .then((res) => {
      setStatus(res.status);
      setChannels(res.data);
    });
  }

  React.useEffect(() => {
    userCredential();

    if(access != '' && user != 0) getAllChannels();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getAllChannels();
    }
  }, [status])


  return (
    <View style={styles.viewChat}>
      <Text>Liste des groupes</Text>
      {status == 'Success' && channels != null ? (
      channels.map((channel, index) => {
        return (
          <View key={index}>
            <Pressable 
              style={styles.blackBtn}
              title={channel.id} 
              onPress={() => { 
                navigation.navigate('Groupes', {
                  screen: 'Channel',
                  params: { id: channel.id },
                });
              }}
            >
              <Text style={styles.blackBtnText}>
              {channel.name}
              </Text>
            </Pressable>
          </View>
        )
      })
    ) : (
      <Text>Pas de groupe rejoint..</Text>
    )}
      <Button title="Deconnexion" onPress={getUsers} />
    </View>
  )
}


export default HomeScreen