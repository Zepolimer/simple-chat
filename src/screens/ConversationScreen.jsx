import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { secureGetRequest } from '../utils/Api';
import { getAccessToken, getUserId } from '../utils/AsyncStorage';
import styles from '../style/style';

const ConversationScreen = ({ route, navigation })  => {
  const { itemId, convId } = route.params;

  const [access, setAccess] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [conversationId, setConversationId] = React.useState(null);
  const [conversation, setConversation] = React.useState(null);

  const userInfos = async () => {
    await getAccessToken().then((token) => { 
      setAccess(token) 
    });

    await getUserId().then((user) => { 
      setUser(user) 
    });
  };

  const getConversation = async () => {
    await secureGetRequest(
      `user/${user}/conversation/${JSON.stringify(convId)}`,
      access
    )
    .then((res) => {
      setStatus(res.status)
      setConversationId(res.conversation_id)
      setConversation(res.data.messages);
    });
  }

  React.useEffect(() => {
    userInfos();

    if(access != '' && user != 0) getConversation();
  }, [access, user])


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