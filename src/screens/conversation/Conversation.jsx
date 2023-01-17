import * as React from 'react';
import { Pressable, Text, ScrollView, View, Alert, SafeAreaView } from 'react-native';

import { secureGetRequest, securePostRequest, secureDeleteRequest } from '../../security/Api';
import { getCredentials, regenerateToken } from '../../security/Credential';

import FormInput from '../../components/FormInput';
import BlackPressable from '../../components/BlackPressable';

import styles from '../../style/style';
import HeaderChat from '../../components/HeaderChat';
import IconButton from '../../components/Iconbutton';


const Conversation = ({ route, navigation })  => {
  const { itemId, convId } = route.params;
  const { name } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [conversationId, setConversationId] = React.useState(null);
  const [conversation, setConversation] = React.useState(null);

  const [message, onChangeMessage] = React.useState('');

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
      getMessages();
      Alert.alert('Message supprimé')
    })
  }


  React.useEffect(() => {
    userCredential();

    if(access != '' && user != 0) getMessages();
    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getMessages();
    }
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <HeaderChat
        iconName={'settings-outline'}
        title={name}
        navigateTo={() => {
          navigation.navigate('ChannelSettings', {
            id: id,
            name: name,
          })
        }}
        goBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.viewChat}>
      {status == 'Success' && conversation != null ? (
        conversation.map((msg, index) => {
          return (
            <ScrollView key={index}>
              {msg.user_id_from != user &&
                <Text style={styles.nameChatTo}>{msg.id_from.firstname} {msg.id_from.lastname}</Text>
              }
              <Pressable 
                style={msg.user_id_from == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
                title={conversationId} 
                onLongPress={() => { Alert.alert(
                  "",
                  "Souhaitez vous supprimer ce message ?",
                  [
                    { text: "Annuler", onPress: () => console.log("Annuler Pressed" + msg.id)},
                    { text: "Supprimer", onPress: () => deleteMessage(msg.id)}
                  ]
                )}}
              >
                <Text style={styles.chatBubbletext}>{msg.message}</Text>
              </Pressable>
            </ScrollView>
          )
        })
      ) : (
        <Text>Pas de message. N'hésitez pas à envoyer un message !</Text>
      )}
      </ScrollView>

      <View style={styles.keyboardWrapper}>
        <FormInput 
          style={styles.keyboardInput}
          onChangeText={onChangeMessage}
          value={message}
          placeholder="Saisir quelque chose .."
          keyboardType="default"
        />
        <IconButton 
          title={'Envoyer'}
          onPress={postMessage}
          iconName={'send'}
        />
      </View>
    </SafeAreaView>
  )
}


export default Conversation