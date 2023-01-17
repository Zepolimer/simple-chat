import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Conversations from '../screens/conversation/Conversations';
import Conversation from '../screens/conversation/Conversation';

const ConversationStack = createNativeStackNavigator();

function ConversationNavigator() {
  return (
    <ConversationStack.Navigator>
      <ConversationStack.Screen 
        name="Conversations" 
        component={Conversations}
        options={{ headerShown: false }}
      />
      <ConversationStack.Screen 
        name="Conversation" 
        component={Conversation} 
        options={({ route }) => ({ title: route.params.name })}  
      />
    </ConversationStack.Navigator>
  );
}


export default ConversationNavigator