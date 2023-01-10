import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { apiGetToken } from '../utils/Api';
import { getStorage } from '../utils/AsyncStorage';
import styles from '../style/style';


const ChannelsScreen = ({ navigation }) => {
  const [accessToken, setAccessToken] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [channels, setChannels] = React.useState(null);

  React.useEffect(() => {
    const getToken = async () => {
      getStorage('access_token')
      .then((token) => { setAccessToken(token) });
    }

    const getUser = async () => {
      getStorage('user_id')
      .then((user) => { setUser(user) });
    }
  
    getToken();
    getUser();

    if(accessToken != '' && user != 0) {
      const getChannels = async () => {
        const data = await apiGetToken(
          `user/${user}/channels`, 
          accessToken
        );
        
        setStatus(data.status)
        setChannels(data.data);
      }
  
      getChannels();
    }
  }, [accessToken, user])


  return (
    <View style={styles.viewDisplay}>
    {status == 'Success' && channels != null ? (
      channels.map((channel, index) => {
        return (
          <View key={index}>
            <Pressable 
              style={styles.blackBtn}
              title={channel.id} 
              onPress={() => { navigation.navigate('Channel', {
                  id: channel.id,
              })}
            }>
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
  </View>
  )
}


export default ChannelsScreen