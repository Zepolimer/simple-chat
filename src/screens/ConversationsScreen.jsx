import * as React from 'react';
import { Pressable, Text, View, ScrollView, SafeAreaView } from 'react-native';

import { getRequest, secureGetRequest, secureFastPostRequest } from '../security/Api';
import { getCredentials, regenerateToken } from '../security/Credential';

import styles from '../style/style';


const ConversationScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [userList, setUserList] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [conversations, setConversations] = React.useState(null);

  const userCredential = async () => {
    await getCredentials()
    .then((res) => {
      if(res) {
        setAccess(res.access);
        setRefresh(res.refresh);
        setUser(res.user);
      }
    });
  }

  const getAllUsers = async () => {
    await getRequest('users')
    .then((res) => {
      if(res.status != 'Error') {
        setUserList(res.data);
      }
    });
  }

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

  const createConversation = async (id) => {
    await secureFastPostRequest(
      `user/${user}/conversation/${id}`, 
      access
    )
    .then((res) => {
      if(res.status != 'Error') {
        getConversations();
      }
    });
  }

  React.useEffect(() => {
    userCredential();
    getAllUsers();

    if(access != '' && user != 0) getConversations();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getConversations();
    }
  }, [status])


  return (
    <SafeAreaView>
    <ScrollView>
      {userList != null && 
      <View style={styles.horizontalWrapper}>
        <ScrollView horizontal={true}>
          <Text>U</Text>
          {userList.map((u, index) => {
              return (
                <View key={index}>
                  {u.id != user && 
                    <Pressable 
                      style={styles.horizontalItem}
                      title={u.id} 
                      onPress={() => createConversation(u.id)}>
                      <View style={styles.horizontalItemImg}></View>
                      <Text style={styles.horizontalItemText}>{u.firstname} {u.lastname}</Text>
                    </Pressable>
                  }
                </View>
              )
            })
          }
        </ScrollView>
      </View>
      }
      <View style={styles.viewChat}>
        <Text style={styles.title}>Vos messages</Text>
        <ScrollView style={{flexDirection: 'column'}}>
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
                    name: conversation.id_from.firstname + " " + conversation.id_from.lastname
                  })}
                }>
                  <View style={styles.horizontalItemImg}></View>
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
          <Text>Veuillez vous connecter pour utiliser cet écran.</Text>
        )}
        </ScrollView>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}


export default ConversationScreen