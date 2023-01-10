import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ConversationsScreen from './src/screens/ConversationsScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import ChannelsScreen from './src/screens/ChannelsScreen';
import ChannelScreen from './src/screens/ChannelScreen';

import { getStorage } from './src/utils/AsyncStorage';


/**
 * ChannelStackScreen contains :
 * ChannelsScreen : All user channels
 * ChannelScreen : All messages inside a channel
 */
const ChannelStack = createNativeStackNavigator();

function ChannelStackScreen() {
  return (
    <ChannelStack.Navigator>
      <ChannelStack.Screen name="Channels" component={ChannelsScreen} />
      <ChannelStack.Screen name="Channel" component={ChannelScreen} />
    </ChannelStack.Navigator>
  );
}

/**
 * ConversationStackScreen contains :
 * ConversationsScreen : All user private conversations
 * ConversationScreen : All messages inside a private
 */
const ConversationStack = createNativeStackNavigator();

function ConversationStackScreen() {
  return (
    <ConversationStack.Navigator>
      <ConversationStack.Screen name="Conversations" component={ConversationsScreen} />
      <ConversationStack.Screen name="Conversation" component={ConversationScreen} />
    </ConversationStack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    getStorage('access_token').then((token) => {
      console.log(token);
      if(token != '') setAuthenticated(true);
      else setAuthenticated(false);
    });
  })
  

  return (
    <NavigationContainer>
      {authenticated == false ? (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Connexion" component={LoginScreen} />
          <AuthStack.Screen name="Inscription" component={RegisterScreen} />
        </AuthStack.Navigator>
      ) : (
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
            } else if (route.name === 'Groupes') {
              iconName = focused ? 'ios-people' : 'ios-people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Messages" component={ConversationStackScreen} />
          <Tab.Screen name="Groupes" component={ChannelStackScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}