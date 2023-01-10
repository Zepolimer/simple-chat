import * as React from 'react';
import { Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import BlackPressable from '../components/BlackPressable';
import FormInput from '../components/FormInput';
import styles from '../style/style';
import { apiPost } from '../utils/Api';
import { setStorage, getStorage } from '../utils/AsyncStorage';


export default function LoginScreen({ navigation }) {
  const [accessToken, setAccessToken] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const userLogin = async () => {
    if(email != '' && password != ''){
      let user = {
        'email': email,
        'password': password,
      }

      const res = await apiPost('login', user);

      await setStorage('access_token', res.data.access_token);
      await setStorage('user_id', res.data.user_id);

      await getStorage('access_token')
      .then((token) => {
        setAccessToken(token)
      });
    }
  }

  return (
    <View style={styles.viewDisplay}>
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
    </View>
  )
}
