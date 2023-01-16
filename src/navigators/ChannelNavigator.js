import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChannelScreen from '../screens/ChannelScreen';
import ChannelsScreen from '../screens/ChannelsScreen';
import NewChannelScreen from '../screens/NewChannelScreen';
import AddUserInChannelScreen from '../screens/AddUserInChannelScreen';

const ChannelStack = createNativeStackNavigator();

function ChannelNavigator() {
  return (
    <ChannelStack.Navigator>
      <ChannelStack.Screen 
        name="Channels" 
        component={ChannelsScreen}
        options={{ headerShown: false }}
      />
      <ChannelStack.Screen 
        name="Channel" 
        component={ChannelScreen} 
        options={({ route }) => ({ title: route.params.name })}
      />
      <ChannelStack.Screen 
        name="NewChannel"
        component={NewChannelScreen}
        options={{ title: 'Créer un groupe' }}
      />
      <ChannelStack.Screen 
        name="AddUserToChannel"
        component={AddUserInChannelScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </ChannelStack.Navigator>
  );
}

export default ChannelNavigator