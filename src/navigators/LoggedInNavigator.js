import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfilScreen from '../screens/ProfilScreen';
import ConversationNavigator from './ConversationNavigator';
import ChannelNavigator from './ChannelNavigator';

const UserTab = createBottomTabNavigator();

function LoggedInNavigator() {
  return (
    <UserTab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        
        if (route.name === 'Accueil') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Messages') {
          iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
        } else if (route.name === 'Groupes') {
          iconName = focused ? 'ios-people' : 'ios-people-outline';
        } else if (route.name === 'Profil') {
          iconName = focused ? 'ios-man' : 'ios-man-outline';
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <UserTab.Screen 
        name="Accueil" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <UserTab.Screen 
        name="Messages" 
        component={ConversationNavigator} 
      />
      <UserTab.Screen 
        name="Groupes" 
        component={ChannelNavigator}
      />
      <UserTab.Screen 
        name="Profil" 
        component={ProfilScreen} 
        options={{ headerShown: false }}
      />
    </UserTab.Navigator>
  )
}

export default LoggedInNavigator