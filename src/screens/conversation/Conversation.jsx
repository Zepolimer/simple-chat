import * as React from 'react';
import { Pressable, Text, ScrollView, View, Alert, SafeAreaView } from 'react-native';

import { secureGetRequest, securePostRequest, secureDeleteRequest } from '../../security/Api';
import { getCredentials, regenerateToken } from '../../security/Credential';

import FormInput from '../../components/input/FormInput';
import BlackPressable from '../../components/button/BlackPressable';

import styles from '../../style/style';
import HeaderChat from '../../components/header/HeaderChat';
import IconButton from '../../components/Iconbutton';


const Conversation = ({ route, navigation })  => {
  const { id } = route.params;
  const { name } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [conversation, setConversation] = React.useState(null);

  const [blockedValue, setBlockedValue] = React.useState(false);
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
      `user/${user}/conversation/${id}`,
      access
    )
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setBlockedValue(res.data.blocked) 
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
        `user/${user}/conversation/${id}/message`,
        msg,
        access,
      )
      .then((res) => {
        if(res.status == 'Blocked') {
          Alert.alert('Votre conversation est bloqué, vous ne pouvez plus rédiger de message.')
        }
        
        onChangeMessage('');
        getMessages();
      })
    }
  }

  const deleteMessage = async (msg_id) => {
    await secureDeleteRequest(
      `user/${user}/conversation/${JSON.stringify(id)}/message/${msg_id}`,
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

    /**
    * CLEAN STATE
    */
    const handleFocus = navigation.addListener('focus', () => {
      getMessages();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <HeaderChat
        iconName={'settings-outline'}
        title={name}
        navigateTo={() => {
          navigation.navigate('ConversationSettings', {
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
                title={id} 
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
          lines={3}
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