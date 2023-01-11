import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { secureGetRequest } from '../utils/Api';
import { getAccessToken, getUserId } from '../utils/AsyncStorage';
import styles from '../style/style';


const ChannelsScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [channels, setChannels] = React.useState(null);

  const userInfos = async () => {
    await getAccessToken().then((token) => { 
      setAccess(token) 
    });

    await getUserId().then((user) => { 
      setUser(user) 
    });
  };

  const getChannels = async () => {
    await secureGetRequest(
      `user/${user}/channels`, 
      access
    )
    .then((res) => {
      setStatus(res.status);
      setChannels(res.data);
    });
  }

  React.useEffect(() => {
    userInfos();

    if(access != '' && user != 0) getChannels();
  }, [access, user])


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