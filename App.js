import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { getAccessToken, getRefreshToken, getUserId } from './src/security/AsyncStorage';
import { regenerateToken } from './src/security/Credential';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ConversationsScreen from './src/screens/ConversationsScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import ChannelsScreen from './src/screens/ChannelsScreen';
import ChannelScreen from './src/screens/ChannelScreen';


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

const UserTab = createBottomTabNavigator();

// function UserTabScreen() {
//   return (
//     <UserTab.Navigator screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;

//         if (route.name === 'Accueil') {
//           iconName = focused ? 'ios-home' : 'ios-home-outline';
//         } else if (route.name === 'Messages') {
//           iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
//         } else if (route.name === 'Groupes') {
//           iconName = focused ? 'ios-people' : 'ios-people-outline';
//         }

//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: 'tomato',
//       tabBarInactiveTintColor: 'gray',
//     })}>
//       <UserTab.Screen name="Accueil" component={HomeScreen} />
//       <UserTab.Screen name="Messages" component={ConversationStackScreen} />
//       <UserTab.Screen name="Groupes" component={ChannelStackScreen} />
//     </UserTab.Navigator>
//   )
// }

const AuthStack = createNativeStackNavigator();

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
      <UserTab.Screen name="Connexion" component={LoginScreen} />
      <UserTab.Screen name="Inscription" component={RegisterScreen} />
      <UserTab.Screen name="Accueil" component={HomeScreen} />
      <UserTab.Screen name="Messages" component={ConversationStackScreen} />
      <UserTab.Screen name="Groupes" component={ChannelStackScreen} />
    </UserTab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('Appname', () => App);

{/* <NavigationContainer>
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
  <UserTab.Screen name="Connexion" component={LoginScreen} />
  <UserTab.Screen name="Inscription" component={RegisterScreen} />
  <UserTab.Screen name="Accueil" component={HomeScreen} />
  <UserTab.Screen name="Messages" component={ConversationStackScreen} />
  <UserTab.Screen name="Groupes" component={ChannelStackScreen} />
</UserTab.Navigator>
</NavigationContainer> */}