import * as React from 'react';
import { 
  Pressable, 
  Text, 
  Alert, 
  View 
} from 'react-native';

import { secureDeleteRequest } from '../../security/Api';

import styles from '../../style/style';


export default function ChannelMessages({ channel, user, id, access, onPress }) {

  const deleteMessage = async (msg_id) => {
    await secureDeleteRequest(
      `user/${user}/channel/${id}/message/${msg_id}`,
      access,
    )
    .then((res) => {
      Alert.alert('Message supprimé');

      if(res.status == 'Success') onPress();
    })
  }

  return (
    <View key={channel.id} style={styles.viewMessages}>
      {channel.user_id != user && 
        <Text style={styles.nameChatTo}>{channel.User.firstname} {channel.User.lastname}</Text>
      }
      <Pressable 
        style={channel.user_id == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
        title={channel.id} 
        onLongPress={() => { Alert.alert(
          "",
          "Souhaitez vous supprimer ce message ?",
          [
            { text: "Annuler", onPress: () => console.log("Annuler Pressed")},
            { text: "Supprimer", onPress: () => deleteMessage(channel.id)}
          ]
        )}}>
        <Text style={styles.chatBubbletext}>{channel.message}</Text>
      </Pressable>
    </View>
  )
}