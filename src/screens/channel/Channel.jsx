import * as React from 'react';
import { Pressable, Text, Alert, ScrollView, SafeAreaView } from 'react-native';

import FixedHeader from '../../components/FixedHeader';
import BlackPressable from '../../components/BlackPressable';
import FormInput from '../../components/FormInput';

import { secureGetRequest, securePostRequest, secureDeleteRequest } from '../../security/Api';
import { getCredentials, regenerateToken } from '../../security/Credential';

import styles from '../../style/style';


const Channel = ({ route, navigation }) => {
  const { id } = route.params;
  const { name } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null);
  const [channel, setChannel] = React.useState(null);

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
      `channel/${id}`, 
      access,
    )
    .then((res) => {
      console.log(res)
      setStatus(res.status);
      setChannel(res.data.messages);
    });
  }

  const postMessage = async () => {
    if(message != ''){
      let msg = {
        'message': message,
      }

      await securePostRequest(
        `user/${user}/channel/${id}/message`,
        msg,
        access,
      )
      .then((res) => {
        console.log(res);
        onChangeMessage('');
        getMessages();
      })
    }
  }

  const deleteMessage = async (msg_id) => {
    await secureDeleteRequest(
      `user/${user}/channel/${id}/message/${msg_id}`,
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

    console.log(channel)
  }, [status])
  

  return (
    <SafeAreaView>
    <FixedHeader 
      iconName={'settings-outline'}
      navigateTo={() => {
        navigation.navigate('ChannelSettings', {
          id: id,
          name: name,
        })
      }}
    /> 

    <ScrollView style={styles.viewChat}>
    {status == 'Success' && channel != null ? (
      channel.map((msg, index) => {
        return (
          <ScrollView key={index}>
            {msg.user_id != user && 
              <Text style={styles.nameChatTo}>{msg.User.firstname} {msg.User.lastname}</Text>
            }
            <Pressable 
              style={msg.user_id == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
              title={msg.id} 
              onLongPress={() => { Alert.alert(
                "",
                "Souhaitez vous supprimer ce message ?",
                [
                  { text: "Annuler", onPress: () => console.log("Annuler Pressed")},
                  { text: "Supprimer", onPress: () => deleteMessage(msg.id)}
                ]
              )}}>
              <Text style={styles.chatBubbletext}>{msg.message}</Text>
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
    </SafeAreaView>
  )
}


export default Channel