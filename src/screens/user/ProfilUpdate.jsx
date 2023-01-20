import * as React from 'react';
import { 
  SafeAreaView,
  View,
} from 'react-native';

import { 
  secureGetRequest, 
  securePutRequest, 
} from '../../security/Api';

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';

import KeyboardView from '../../components/keyboard/KeyboardView';
import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';
import BlackPressable from '../../components/button/BlackPressable';
import FormInput from '../../components/input/FormInput';

import styles from '../../style/style';


export default function ProfilUpdate({ navigation }) {
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
    await getUserId()
    .then((res) => setUser(res))
  }

  const userInformations = async () => {
    await secureGetRequest(
      `user/${user}`,
    )
    .then((res) => {
      if(res.status != 'Error') {
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
      )
      .then((res) => {
        console.log(res);
      })
    })
  }

  React.useEffect(() => {
    userCredential();
    userInformations();
  }, [user])
  

  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />

      <KeyboardView>
        <View style={styles.viewAuth}>
          <View style={styles.whiteCard}>
            <FormInput
              onChangeText={onChangeUsername}
              value={username != '' ? username : oldUsername}
              placeholder={oldUsername}
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeFirstname}
              value={firstname != '' ? firstname : oldFirstname}
              placeholder={oldFirstname}
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeLastname}
              value={lastname != '' ? lastname : oldLastname}
              placeholder={oldLastname}
              keyboardType="default"
            />

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
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}
