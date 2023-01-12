import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { secureGetRequest } from '../security/Api';
import { getAccessToken, getRefreshToken, getUserId } from '../security/AsyncStorage';
import { regenerateToken } from '../security/Credential';

import styles from '../style/style';


const ConversationScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [conversations, setConversations] = React.useState(null);

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

  const getConversations = async () => {
    await secureGetRequest(
      `user/${user}/conversations`, 
      access
    )
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setConversations(res.data);
      }
    });
  }

  React.useEffect(() => {
    userInfos();

    if(access != '' && user != 0) getConversations();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getConversations();
    }
  }, [status])


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
                {user == conversation.id_from ? (
                  <Text style={styles.chatText}>
                  {conversation.id_to.firstname} {conversation.id_to.lastname}
                  </Text>
                ) : (
                  <Text style={styles.chatText}>
                  {conversation.id_from.firstname} {conversation.id_from.lastname}
                  </Text>
                )}
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