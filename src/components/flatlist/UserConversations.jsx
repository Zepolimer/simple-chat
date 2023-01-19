import * as React from 'react';
import { 
  Pressable, 
  Text, 
  View 
} from 'react-native';

import styles from '../../style/style';


/**
 * @param {*} conversation List of conversations returned by request
 * @param {*} user Connected user ID 
 * @param {*} navigation Usefull for navigate method
 */
export default function UserConversations({ conversation, user, navigation }) {

  const messageSendBy = async (item) => {
    let routename = '';

    if(user == item.id_from.id) {
      routename = item.id_to.firstname + " " + item.id_to.lastname
    } else {
      routename = item.id_from.firstname + " " + item.id_from.lastname
    }

    return navigation.navigate('Conversation', {
      id: item.id,
      name: routename
    })
  }

  return (
    <View key={conversation.id} style={styles.chatWrapper}>
      <Pressable
        style={styles.chatBtn}
        title={conversation.id}
        onPress={() => messageSendBy(conversation)}
      >
        <View style={styles.horizontalItemImg}></View>

        {user == conversation.id_from.id ? (
          <Text style={styles.chatText}>
          {conversation.id_to.firstname} {conversation.id_to.lastname}
          </Text>
        ) : (
          <Text style={styles.chatText}>
          {conversation.id_from.firstname} {conversation.id_from.lastname}
          </Text>
        )}
      </Pressable>
    </View>
  )
}
