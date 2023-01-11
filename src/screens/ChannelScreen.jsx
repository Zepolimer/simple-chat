import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { secureGetRequest } from '../utils/Api';
import { getAccessToken, getRefreshToken, getUserId } from '../utils/AsyncStorage';
import { regenerateToken } from '../utils/Interceptor';
import styles from '../style/style';


const ChannelScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null);
  const [channel, setChannel] = React.useState(null);

  const userInfos = async () => {
    await getAccessToken().then((token) => { 
      setAccess(token) 
    });

    await getRefreshToken().then((token) => { 
      setRefresh(token) 
    });

    await getUserId().then((user) => { 
      setUser(user) 
    });
  };

  const getChannel = async () => {
    await secureGetRequest(
      `channel/${id}`, 
      access,
    )
    .then((res) => {
      setStatus(res.status);
      setChannel(res.data.messages);
    });
  }

  React.useEffect(() => {
    userInfos();

    if(access != '' && user != 0) getChannel();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getChannel();
    }
  }, [status])
  

  return (
    <View style={styles.viewDisplay}>
    {status == 'Success' && channel != null ? (
      channel.map((message, index) => {
        return (
          <View key={index}>
            {message.user_id == user ? (
              <Text style={styles.nameChatFrom}>Vous</Text>
            ) : (
              <Text style={styles.nameChatTo}>Autre</Text>
            )}
            <Pressable 
              style={message.user_id == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
              title={message.id} 
              onPress={() => {console.log('ouaip')}}>
              <Text>{message.message}</Text>
            </Pressable>
          </View>
        )
      })
    ) : (
      <Text>Pas de message. N'hésitez pas à envoyer un message !</Text>
    )}
    </View>
  )
}


export default ChannelScreen