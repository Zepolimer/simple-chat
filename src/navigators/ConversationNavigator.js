import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConversationsScreen from '../screens/ConversationsScreen';
import ConversationScreen from '../screens/ConversationScreen';

const ConversationStack = createNativeStackNavigator();

function ConversationNavigator() {
  return (
    <ConversationStack.Navigator>
      <ConversationStack.Screen 
        name="Conversations" 
        component={ConversationsScreen}
        options={{ headerShown: false }}
      />
      <ConversationStack.Screen 
        name="Conversation" 
        component={ConversationScreen} 
        options={({ route }) => ({ title: route.params.name })}  
      />
    </ConversationStack.Navigator>
  );
}


export default ConversationNavigator