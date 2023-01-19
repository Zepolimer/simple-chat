import * as React from 'react';
import { 
  SafeAreaView, 
  View,
  FlatList,
} from 'react-native';


import { 
  secureGetRequest, 
  securePostRequest 
} from '../../security/Api';

import { 
  getCredentials, 
  regenerateToken 
} from '../../security/Credential';

import HeaderChat from '../../components/header/HeaderChat';
import KeyboardView from '../../components/keyboard/KeyboardView';
import ChannelMessages from '../../components/flatlist/ChannelMessages'
import FormInput from '../../components/input/FormInput';
import IconButton from '../../components/Iconbutton';

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
      setStatus(res.status);
      if(res.status != 'Error') setChannel(res.data.messages);
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
        onChangeMessage('');
        getMessages();
      })
    }
  }

  React.useEffect(() => {
    userCredential();

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
          navigation.navigate('ChannelSettings', {
            id: id,
            name: name,
          })
        }}
        goBack={() => navigation.navigate('Channels')}
      />

      <KeyboardView>
        <FlatList
          data={channel}
          renderItem={({item}) => <ChannelMessages channel={item} user={user} id={id} access={access} onPress={getMessages} />}
          keyExtractor={item => item.id}
          extraData={[user, id, access]}
          scrollToEnd
        />
        
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
      </KeyboardView>
    </SafeAreaView>
  )
}


export default Channel