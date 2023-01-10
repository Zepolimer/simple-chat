import * as React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

import { apiGetToken } from '../utils/Api';
import styles from '../style/style';


const ConversationScreen = ({ navigation }) => {
  const [status, setStatus] = React.useState(null)
  const [conversations, setConversations] = React.useState(null);

  let userId = 5;
  let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImlhdCI6MTY3MzM1NTQ0NiwiZXhwIjoxNjczMzU5MDQ2fQ.rcwUVu-Ub0oGjICfH5fJvTAaUQ9CZmxGbM_JpLC0Fn0';

  React.useEffect(() => {
    const getConversations = async () => {
      const data = await apiGetToken(`user/${userId}/conversations`, userToken);
      
      setStatus(data.status)
      setConversations(data.data);
    }

    getConversations();
  }, [])

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
                  itemId: userId,
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