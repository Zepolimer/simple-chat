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

import { getAccessToken, getRefreshToken, getUserId } from './src/utils/AsyncStorage';
import { regenerateToken } from './src/utils/Interceptor';


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

function AuthStackScreen() {
  <AuthStack.Navigator>
    <AuthStack.Screen name="Connexion" component={LoginScreen} />
    <AuthStack.Screen name="Inscription" component={RegisterScreen} />
  </AuthStack.Navigator>
}

const UserTab = createBottomTabNavigator();

function UserTabScreen() {
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
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <UserTab.Screen name="Accueil" component={HomeScreen} />
      <UserTab.Screen name="Messages" component={ConversationStackScreen} />
      <UserTab.Screen name="Groupes" component={ChannelStackScreen} />
    </UserTab.Navigator>
  )
}

const AppScreen = createNativeStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [access, setAccess] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [user, setUser] = React.useState(0);

  const userInfos = async () => {
    await getAccessToken().then((token) => { 
      setAccess(token);

      if(token != '') setAuthenticated(true);
      else setAuthenticated(false);
    });

    await getRefreshToken().then((token) => { 
      setRefresh(token) 
    });

    await getUserId().then((user) => { 
      setUser(user) 
    });

    if(authenticated !== '') await regenerateToken(refresh);
  };

  React.useEffect(() => {
    userInfos();
  })


  return (
    <NavigationContainer>
    {authenticated == false ? (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Connexion" component={LoginScreen} />
        <AuthStack.Screen name="Inscription" component={RegisterScreen} />
      </AuthStack.Navigator>
    ) : (
      <UserTab.Navigator screenOptions={({ route }) => ({
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
        <UserTab.Screen name="Accueil" component={HomeScreen} />
        <UserTab.Screen name="Messages" component={ConversationStackScreen} />
        <UserTab.Screen name="Groupes" component={ChannelStackScreen} />
      </UserTab.Navigator>
    )}
    </NavigationContainer>
  );
}
