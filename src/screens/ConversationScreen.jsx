import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { apiGetToken } from '../utils/Api';
import styles from '../style/style';

const ConversationScreen = ({ route, navigation })  => {
  const { itemId, convId } = route.params;

  const [status, setStatus] = React.useState(null)
  const [conversationId, setConversationId] = React.useState(null);
  const [conversation, setConversation] = React.useState(null);

  let userId = 5;
  let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImlhdCI6MTY3MzM1NTQ0NiwiZXhwIjoxNjczMzU5MDQ2fQ.rcwUVu-Ub0oGjICfH5fJvTAaUQ9CZmxGbM_JpLC0Fn0';

  React.useEffect(() => {
    const getConversation = async () => {
      const data = await apiGetToken(`user/${JSON.stringify(itemId)}/conversation/${JSON.stringify(convId)}`, userToken);
      
      setStatus(data.status)
      setConversationId(data.conversation_id)
      setConversation(data.data.messages);
    }

    getConversation();
  }, [])

  return (
    <View style={styles.viewChat}>
    {status == 'Success' && conversation != null ? (
      conversation.map((message, index) => {
        return (
          <View key={index}>
            <Pressable 
              style={message.user_id_from == userId ? styles.chatBubbleFrom : styles.chatBubbleTo}
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