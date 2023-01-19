import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  Text, 
  Pressable, 
} from 'react-native';

import { 
  secureGetRequest
} from '../../security/Api';

import { 
  getCredentials, 
  resetCredentials, 
  regenerateToken 
} from '../../security/Credential';


import styles from '../../style/style';


const Profil = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [createdAt, setCreatedAt] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);

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

  const userInformations = async () => {
    await secureGetRequest(
      `user/${user}`,
      access,
    )
    .then((res) => {
      if(res.status != 'Error') {
        setUserInfo(res.data);
        setCreatedAt(formatDate(res.data.created_at))
      }
    })
  }

  const disconnect = async () => {
    await resetCredentials()
    .then((res) => {
      navigation.navigate('Connexion')
    })
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  React.useEffect(() => {
    userCredential();

    if(access != '' && user != 0) userInformations();
  })


  return (
    <SafeAreaView style={styles.screen}>
      {userInfo != null && 
        <View style={styles.whiteCard}>
          <Text style={styles.pressableWarning}>VOS INFORMATIONS</Text>
          <Text>Pseudo : {userInfo.username}</Text>
          <Text style={styles.pressableWarning}>Email : {userInfo.email}</Text>
          <Text>Inscription : le {createdAt}</Text> 
        </View>
      }

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarning}>Vous pouvez modifier votre nom d'utilisateur, prénom, nom et/ou email sous réserve que l'email ne soit pas déjà utilisée.</Text>
        <Pressable 
          style={styles.getPressable}
          onPress={() => navigation.navigate('ProfilUpdate')}
        >
          <Text style={styles.deletePressableText}>Modifier vos informations</Text>
        </Pressable>
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarning}>Vous devrez vous reconnecter pour accéder à nouveau à vos conversations et groupes.</Text>
        <Pressable 
          style={styles.deletePressable}
          onPress={disconnect}
        >
          <Text style={styles.deletePressableText}>Deconnexion</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Profil