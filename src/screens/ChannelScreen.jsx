import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { apiGetToken } from '../utils/Api';
import { getStorage } from '../utils/AsyncStorage';
import styles from '../style/style';


const ChannelScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [accessToken, setAccessToken] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null);
  const [channel, setChannel] = React.useState(null);

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
      const getConversations = async () => {
        const data = await apiGetToken(
          `channel/${id}`, 
          accessToken,
        );
        
        setStatus(data.status)
        setChannel(data.data.messages);
      }
  
      getConversations();
    }
  }, [accessToken, user])
  

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