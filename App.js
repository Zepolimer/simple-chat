import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';

import { 
  getCredentials, 
  regenerateToken 
} from './src/security/Credential';

import AuthNavigator from './src/navigators/AuthNavigator';
import LoggedInNavigator from './src/navigators/LoggedInNavigator';


const Stack = createStackNavigator();

export default function App() {
  // const [authenticated, setAuthenticated] = React.useState(false);
  // const [access, setAccess] = React.useState('');
  // const [refresh, setRefresh] = React.useState('');
  // const [user, setUser] = React.useState(0);

  // const userCredential = async () => {
  //   await getCredentials()
  //   .then((res) => {
  //     if(res) {
  //       setAccess(res.access);
  //       setRefresh(res.refresh);
  //       setUser(res.user);

  //       if(res.access != '') {
  //         setAuthenticated(true);
  //       } else {
  //         setAuthenticated(false);
  //       }
  //     }
  //   });

  //   if(authenticated !== true) await regenerateToken(refresh);
  // }

  // React.useEffect(() => {
  //   userCredential();
  // })


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
