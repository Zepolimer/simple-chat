import * as React from 'react';
import { Text, Pressable, View, SafeAreaView } from 'react-native';

import { secureGetRequest, securePutRequest, secureDeleteRequest } from '../security/Api';
import { getCredentials, resetCredentials, regenerateToken } from '../security/Credential';

import BlackPressable from '../components/BlackPressable';
import FormInput from '../components/FormInput';
import styles from '../style/style';

const ProfilScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const [oldUsername, setOldUsername] = React.useState('');
  const [oldFirstname, setOldFirstname] = React.useState('');
  const [oldLastname, setOldlastname] = React.useState('');
  const [oldEmail, setOldEmail] = React.useState('');

  const [username, onChangeUsername] = React.useState('');
  const [firstname, onChangeFirstname] = React.useState('');
  const [lastname, onChangeLastname] = React.useState('');
  const [email, onChangeEmail] = React.useState('');

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
        console.log(res.data)
        setOldUsername(res.data.username)
        setOldFirstname(res.data.firstname)
        setOldlastname(res.data.lastname)
        setOldEmail(res.data.email)
      }
    })
  }

  const userChanges = async () => {
    let informations = {}

    if(username != '' && username != oldUsername) {
      informations.username = username;
    }

    if(firstname != '' && firstname != oldFirstname) {
      informations.firstname = firstname;
    }

    if(lastname != '' && lastname != oldLastname) {
      informations.lastname = lastname;
    }

    if(email != '' && email != oldEmail) {
      informations.email = email;
    }

    return informations
  }

  const putUserInformations = async () => {
    await userChanges()
    .then((body) => {
      securePutRequest(
        `user/${user}`,
        body,
        access,
      )
      .then((res) => {
        console.log(res);
      })
    })
  }

  const disconnect = async () => {
    await resetCredentials()
    .then((res) => {
      navigation.navigate('Connexion')
    })
  };

  React.useEffect(() => {
    userCredential();

    if(access != '' && user != 0) userInformations();
  })

  return (
    <SafeAreaView style={{ width: '100%', flex: 1 }}>
    {access != '' && user != 0 ? (
      <View style={styles.viewDisplay}>
        <Text style={styles.selfAlignItem}>Modifier vos informations</Text>
        <Text style={styles.selfAlignItem}>Vous pouvez modifier une ou plusieurs information(s) en renseignant les champs ci-dessous.</Text>

        <Text style={styles.selfAlignItem}>Nom d'utilisateur</Text>
        <FormInput
          onChangeText={onChangeUsername}
          value={username != '' ? username : oldUsername}
          placeholder={oldUsername}
          keyboardType="default"
        />

        <Text style={styles.selfAlignItem}>Prénom</Text>
        <FormInput
          onChangeText={onChangeFirstname}
          value={firstname != '' ? firstname : oldFirstname}
          placeholder={oldFirstname}
          keyboardType="default"
        />

        <Text style={styles.selfAlignItem}>Nom</Text>
        <FormInput
          onChangeText={onChangeLastname}
          value={lastname != '' ? lastname : oldLastname}
          placeholder={oldLastname}
          keyboardType="default"
        />

        <Text style={styles.selfAlignItem}>Email</Text>
        <FormInput
          onChangeText={onChangeEmail}
          value={email != '' ? email : oldEmail}
          placeholder={oldEmail}
          keyboardType="email-address"
        />

        <BlackPressable 
          title={'Enregister'}
          onPress={putUserInformations}
          text={'Enregister'}
        />

        <View>
          <Pressable onPress={disconnect}>
            <Text>Deconnexion</Text>
          </Pressable>
        </View>
      </View>
    ) : (
      <View>
        <Text>Veuillez vous connecter pour accéder à cet écran.</Text>
      </View>
    )}
    </SafeAreaView>
  )
}

export default ProfilScreen