import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';

import AuthNavigator from './src/navigators/AuthNavigator';
import LoggedInNavigator from './src/navigators/LoggedInNavigator';


const Stack = createStackNavigator();

export default function App() {
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
