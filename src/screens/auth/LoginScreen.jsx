import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';

import { postRequest } from '../../security/Api';
import { setCredentials } from '../../security/Credential';

import BlackPressable from '../../components/BlackPressable';
import FormInput from '../../components/FormInput';
import styles from '../../style/style';


export default function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const isLoggedIn = async () => {
    return navigation.navigate('App')
  }

  const userLogin = async () => {
    if(email != '' && password != ''){
      let user = {
        'email': email,
        'password': password,
      }

      await postRequest('login', user)
      .then((res) => {
        setCredentials(
          res.data.access_token, 
          res.data.refresh_token, 
          res.data.user_id
        )
      })
      .then(user => isLoggedIn());
    }
  }

  return (
    <SafeAreaView style={styles.viewDisplay}>
      <Text style={styles.selfAlignItem}>Email</Text>
      <FormInput
        onChangeText={onChangeEmail}
        value={email}
        placeholder="email@email.com"
        keyboardType="email-address"
      />

      <Text style={styles.selfAlignItem}>Mot de passe</Text>
      <FormInput
        onChangeText={onChangePassword}
        value={password}
        placeholder="motdepasse"
        keyboardType="default"
      />

      <BlackPressable 
        title={'Connexion'}
        onPress={userLogin}
        text={'Connexion'}
      />

      <View style={styles.authBtnSwitchView}>
        <Text>Pas encore inscrit ? </Text>
        <Text 
          style={styles.authBtnSwitchText}
          onPress={() => navigation.navigate('Inscription')}
        >
          Créer un compte.
        </Text>
      </View>
    </SafeAreaView>
  )
}