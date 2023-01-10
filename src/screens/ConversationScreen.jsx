import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { apiGetToken } from '../utils/Api';
import { getStorage } from '../utils/AsyncStorage';
import styles from '../style/style';

const ConversationScreen = ({ route, navigation })  => {
  const { itemId, convId } = route.params;

  const [accessToken, setAccessToken] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [conversationId, setConversationId] = React.useState(null);
  const [conversation, setConversation] = React.useState(null);

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
      const getConversation = async () => {
        const data = await apiGetToken(
          `user/${user}/conversation/${JSON.stringify(convId)}`,
          accessToken
        );
        
        setStatus(data.status)
        setConversationId(data.conversation_id)
        setConversation(data.data.messages);
      }
      getConversation();
    }
  }, [accessToken, user])


  return (
    <View style={styles.viewChat}>
    {status == 'Success' && conversation != null ? (
      conversation.map((message, index) => {
        return (
          <View key={index}>
            {message.user_id_from == user ? (
              <Text style={styles.nameChatFrom}>Vous</Text>
            ) : (
              <Text style={styles.nameChatTo}>{message.id_from.firstname} {message.id_from.lastname}</Text>
            )}
            <Pressable 
              style={message.user_id_from == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
              title={conversationId} 
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


export default ConversationScreen