import * as React from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';
import BlackPressable from '../components/BlackPressable';
import FormInput from '../components/FormInput';

import { secureGetRequest, securePostRequest } from '../security/Api';
import { getAccessToken, getRefreshToken, getUserId } from '../security/AsyncStorage';
import { regenerateToken } from '../security/Credential';

import styles from '../style/style';


const ChannelScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null);
  const [channel, setChannel] = React.useState(null);

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
      `channel/${id}`, 
      access,
    )
    .then((res) => {
      console.log(res.data.messages)
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
        `user/${user}/channel/${JSON.stringify(id)}/message`,
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
    {status == 'Success' && channel != null ? (
      channel.map((msg, index) => {
        return (
          <ScrollView key={index}>
            {msg.user_id == user ? (
              <Text style={styles.nameChatFrom}>Vous</Text>
            ) : (
              <Text style={styles.nameChatTo}>{msg.User.firstname} {msg.User.lastname}</Text>
            )}
            <Pressable 
              style={msg.user_id == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
              title={msg.id} 
              onPress={() => {console.log('ouaip')}}>
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


export default ChannelScreen