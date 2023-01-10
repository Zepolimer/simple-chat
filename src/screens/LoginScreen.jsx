import * as React from 'react';
import { Text, View } from 'react-native';

import BlackPressable from '../components/BlackPressable';
import FormInput from '../components/FormInput';
import styles from '../style/style';
import { apiPost } from '../utils/Api';


export default function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const userLogin = async () => {
    if(email != '' && password != ''){
      let user = {
        'email': email,
        'password': password,
      }

      await apiPost('login', user);
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
