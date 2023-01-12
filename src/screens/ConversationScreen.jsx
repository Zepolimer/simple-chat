import * as React from 'react';
import { Pressable, Text, ScrollView, View, Alert } from 'react-native';

import { secureGetRequest, securePostRequest, secureDeleteRequest } from '../security/Api';
import { getAccessToken, getRefreshToken, getUserId } from '../security/AsyncStorage';
import { regenerateToken } from '../security/Credential';

import FormInput from '../components/FormInput';
import BlackPressable from '../components/BlackPressable';

import styles from '../style/style';


const ConversationScreen = ({ route, navigation })  => {
  const { itemId, convId } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [conversationId, setConversationId] = React.useState(null);
  const [conversation, setConversation] = React.useState(null);

  const [message, onChangeMessage] = React.useState('');

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

  const getMessages = async () => {
    await secureGetRequest(
      `user/${itemId}/conversation/${JSON.stringify(convId)}`,
      access
    )
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setConversationId(res.conversation_id)
        setConversation(res.data.messages);
      }
    });
  }

  const postMessage = async () => {
    if(message != ''){
      let msg = {
        'message': message,
      }

      await securePostRequest(
        `user/${itemId}/conversation/${JSON.stringify(convId)}/message`,
        msg,
        access,
      )
      .then((res) => {
        console.log(res)
        onChangeMessage('');
        getMessages();
      })
    }
  }

  const deleteMessage = async (id) => {
    await secureDeleteRequest(
      `user/${itemId}/conversation/${JSON.stringify(convId)}/message/${id}`,
      access,
    )
    .then((res) => {
      console.log(res)
      getMessages();
    })
  }

  const openModal = () => {
    Alert.alert(
      "Suppression",
      "Souhaitez vous supprimer ce message ?",
      [
        { text: "Annuler", onPress: () => console.log("Annuler Pressed")},
        { text: "Supprimer", onPress: deleteMessage}
      ]
    );
    console.log('ok')
  }


  React.useEffect(() => {
    userInfos();

    if(access != '' && user != 0) getMessages();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getMessages();
    }
  }, [status])


  return (
    <ScrollView style={styles.viewChat}>
    {status == 'Success' && conversation != null ? (
      conversation.map((msg, index) => {
        return (
          <ScrollView key={index}>
            {msg.user_id_from == user ? (
              <Text style={styles.nameChatFrom}>Vous</Text>
            ) : (
              <Text style={styles.nameChatTo}>{msg.id_from.firstname} {msg.id_from.lastname}</Text>
            )}
            <Pressable 
              style={msg.user_id_from == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
              title={conversationId} 
              onPress={() => { Alert.alert(
                "Suppression",
                "Souhaitez vous supprimer ce message ?",
                [
                  { text: "Annuler", onPress: () => console.log("Annuler Pressed" + msg.id)},
                  { text: "Supprimer", onPress: () => deleteMessage(msg.id)}
                ]
              );
              console.log('ok')
            }}
            >
              <Text>{msg.message}</Text>
            </Pressable>
          </ScrollView>
        )
      })
    ) : (
      <Text>Pas de message. N'hésitez pas à envoyer un message !</Text>
    )}
      <FormInput 
        onChangeText={onChangeMessage}
        value={message}
        placeholder="Saisir quelque chose .."
        keyboardType="default"
      />
      <BlackPressable
        title={'Envoyer'}
        onPress={postMessage}
        text={'Envoyer'}
      />
    </ScrollView>
  )
}


export default ConversationScreen