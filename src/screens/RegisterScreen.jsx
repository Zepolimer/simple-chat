import * as React from 'react';
import { Text, View } from 'react-native';

import { postRequest } from '../security/Api';

import BlackPressable from '../components/BlackPressable';
import FormInput from '../components/FormInput'
import styles from '../style/style';


export default function RegisterScreen({ navigation }) {
  const [username, onChangeUsername] = React.useState('');
  const [firstname, onChangeFirstname] = React.useState('');
  const [lastname, onChangeLastname] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const userRegister = async () => {
    if(username !='' && firstname !='' && lastname !='' && email != '' && password != ''){
      let user = {
        'username': username,
        'firstname': firstname,
        'lastname': lastname,
        'email': email,
        'password': password,
      }

      await postRequest('register', user)
    }
  }

  return (
    <View style={styles.viewDisplay}>
      <Text style={styles.selfAlignItem}>Nom d'utilisateur</Text>
      <FormInput
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Ex: JohnDoe012"
        keyboardType="default"
      />

      <Text style={styles.selfAlignItem}>Prénom</Text>
      <FormInput
        onChangeText={onChangeFirstname}
        value={firstname}
        placeholder="Ex: John"
        keyboardType="default"
      />

      <Text style={styles.selfAlignItem}>Nom</Text>
      <FormInput
        onChangeText={onChangeLastname}
        value={lastname}
        placeholder="Ex: Doe"
        keyboardType="default"
      />

      <Text style={styles.selfAlignItem}>Email</Text>
      <FormInput
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Ex: johndoe@email.com"
        keyboardType="email-address"
      />

      <Text style={styles.selfAlignItem}>Mot de passe</Text>
      <FormInput
        onChangeText={onChangePassword}
        value={password}
        placeholder="Ex: motdepasse"
        keyboardType="default"
      />

      <BlackPressable 
        title={'Enregistrer'}
        onPress={userRegister}
        text={'Enregistrer'}
      />

      <View style={styles.authBtnSwitchView}>
        <Text>Déjà inscrit ? </Text>
        <Text 
          style={styles.authBtnSwitchText}
          onPress={() => navigation.navigate('Connexion')} 
        >
          Se connecter.
        </Text>
      </View>
    </View>
  )
}
