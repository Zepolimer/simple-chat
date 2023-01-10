import * as React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

import { apiGetToken } from '../utils/Api';
import { getStorage } from '../utils/AsyncStorage';
import styles from '../style/style';


const ConversationScreen = ({ navigation }) => {
  const [accessToken, setAccessToken] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [conversations, setConversations] = React.useState(null);

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
          `user/${user}/conversations`, 
          accessToken
        );
        
        setStatus(data.status)
        setConversations(data.data);
      }
  
      getConversations();
    }
  }, [accessToken, user])


  return (
    <View style={styles.viewChat}>
      {status == 'Success' && conversations != null ? (
        conversations.map((conversation, index) => {
          return (
            <View key={index}>
              <Pressable 
                style={styles.chatBtn}
                title={conversation.id} 
                onPress={() => { navigation.navigate('Conversation', {
                  itemId: user,
                  convId: conversation.id,
                })}
              }>
                <Text style={styles.chatText}>
                {conversation.id_from.firstname} {conversation.id_from.lastname}
                </Text>
              </Pressable>
            </View>
          )
        })
      ) : (
        <Text>Pas de conversations. N'hésitez pas à démarrer une discussion avec l'un ou l'une de vos ami(e) !</Text>
      )}
    </View>
  )
}


export default ConversationScreen