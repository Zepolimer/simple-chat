import * as React from 'react';
import { Pressable, Text, View, ScrollView, SafeAreaView, Alert } from 'react-native';

import { getCredentials, regenerateToken } from '../../security/Credential';

import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';

import styles from '../../style/style';
import { secureGetRequest, securePutRequest, secureDeleteRequest } from '../../security/Api';


const ConversationSettings = ({ route, navigation }) => {
  const { id } = route.params;
  const { name } = route.params;

  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [blockedValue, setBlockedValue] = React.useState(null);

  
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

  const getBlockedStatus = async () => {
    await secureGetRequest(
      `user/${user}/conversation/${id}/blocked`,
      access
    )
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setBlockedValue(res.data)
      }
    });
  }

  const updateBlockedStatus = async (value) => {
    let blocked = {
      blocked : value
    }

    await securePutRequest(
      `user/${user}/conversation/${id}`,
      blocked,
      access,
    )
    .then((res) => {
      if(res.status != 'Error') {
        console.log(res.data.blocked)
      }
    });
  }

  const handleBlocked = async () => {
    if(blockedValue) {
      setBlockedValue(false)
      await updateBlockedStatus(false); 
    } else {
      setBlockedValue(true)
      await updateBlockedStatus(true); 
    }
  }

  const deleteConversation = async () => {
    await secureDeleteRequest(
      `user/${user}/conversation/${id}`,
      access,
    )
    .then((res) => {
      if(res.status == 'Success') {
        navigation.navigate('Conversations')
      }
    });
  }

  React.useEffect(() => {
    userCredential();

    if(access != '' && user != 0) getBlockedStatus();

    if(status == 'Error') {
      regenerateToken(refresh);
    } else if(status != 'Error') {
      getBlockedStatus();
    }
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarning}>Cochez cette case si vous souhaitez bloquer l'utilisateur.</Text> 
        <Text style={styles.pressableWarning}>Vous pourrez consulter les messages envoyés mais ni vous, ni l'utilisateur bloqué ne pourra écrire de nouveau message.</Text>
        <Text style={styles.pressableWarning}>Vous pouvez à tout moment débloquer l'utilisateur et échanger à nouveau des messages.</Text>

        {blockedValue != null && 
          <View style={styles.toggleCheckoxWrapper}>
            <Pressable 
              style={blockedValue ? styles.checkboxChecked : styles.checkbox}
              onPress={() => handleBlocked()}
            />
            <Text style={blockedValue ? styles.toggleCheckboxTextBold : styles.toggleCheckboxText}>
            {blockedValue ? 'Bloqué' : 'Non bloqué'}
            </Text>
          </View>
        }
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarningBold}>Attention, cette action est irréversible.</Text> 
        <Text style={styles.pressableWarning}>Votre conversation sera définitivement supprimée, tout comme les messages échangés par entre vous et l'utilisateur.</Text>
        <Pressable 
          style={styles.deletePressable}
          onPress={() => deleteConversation()}
        >
          <Text style={styles.deletePressableText}>Supprimer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default ConversationSettings