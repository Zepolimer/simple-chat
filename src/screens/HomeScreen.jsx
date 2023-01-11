import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { setAccessToken, setRefreshToken } from '../utils/AsyncStorage';


const HomeScreen = ({ navigation }) => {
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const getUsers = async () => {
    await setAccessToken('');
    await setRefreshToken('');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button title="Utilisateurs" onPress={getUsers} />
  </View>
  )
}


export default HomeScreen