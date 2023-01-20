import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';

import { getAccessToken } from './src/security/AsyncStorage';

import AuthNavigator from './src/navigators/AuthNavigator';
import LoggedInNavigator from './src/navigators/LoggedInNavigator';

import { resetCredentials, setCredentials } from './src/security/Credential';


const Stack = createStackNavigator();

export default function App() {
  
  const [access, setAccess] = React.useState('');
  const [isLogged, setIsLogged] = React.useState(false);

  const userCredentials = async () => {
    await getAccessToken()
    .then((res) => {
      setAccess(res)
    })
  }

  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async (data) => {
  //       await setCredentials(
  //         data.access_token, 
  //         data.refresh_token, 
  //         data.user_id
  //       )
  //     },
  //     signOut: async () => await resetCredentials(),
  //   }),
  //   []
  // );

  React.useEffect(() => {
    userCredentials(); 
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen 
            name="App" 
            component={LoggedInNavigator} 
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('Appname', () => App);
