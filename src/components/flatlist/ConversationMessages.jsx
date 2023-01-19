import * as React from 'react';
import { 
  Pressable, 
  Text, 
  Alert, 
  View 
} from 'react-native';

import { secureDeleteRequest } from '../../security/Api';

import styles from '../../style/style';


/**
 * @param {*} conversation List of conversation messages returned by request
 * @param {*} user Connected user ID 
 * @param {*} id Conversation ID
 * @param {*} access Connected user access token 
 * @param {*} onPress Function for re-render
 */
export default function ConversationMessages({ conversation, user, id, access, onPress }) {

  const deleteMessage = async (msg_id) => {
    await secureDeleteRequest(
      `user/${user}/conversation/${JSON.stringify(id)}/message/${msg_id}`,
      access,
    )
    .then((res) => {
      Alert.alert('Message supprimé')

      if(res.status == 'Success') onPress();
    })
  }

  return (
    <View key={conversation.id} style={styles.viewMessages}>
      {conversation.user_id_from != user &&
        <Text style={styles.nameChatTo}>{conversation.id_from.firstname} {conversation.id_from.lastname}</Text>
      }
      <Pressable 
        style={conversation.user_id_from == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
        title={id} 
        onLongPress={() => { Alert.alert(
          "",
          "Souhaitez vous supprimer ce message ?",
          [
            { text: "Annuler", onPress: () => console.log("Annuler Pressed" + conversation.id)},
            { text: "Supprimer", onPress: () => deleteMessage(conversation.id)}
          ]
        )}}
      >
        <Text style={styles.chatBubbletext}>{conversation.message}</Text>
      </Pressable>
    </View>
  )
}
