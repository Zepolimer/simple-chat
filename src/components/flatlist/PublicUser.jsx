import * as React from 'react';
import { 
  View, 
  Pressable, 
  Text, 
} from 'react-native';

import { 
  secureFastPostRequest 
} from '../../security/Api';

import styles from '../../style/style';

/**
 * @param {*} u List of users returned by request
 * @param {*} user Connected user ID 
 * @param {*} access Connected user access token 
 * @param {*} onPress Function for re-render
 */
export default function PublicUser({ u, user, access, onPress }) {

  const createConversation = async (id) => {
    await secureFastPostRequest(
      `user/${user}/conversation/${id}`, 
      access
    )
    .then((res) => {
      if(res.status != 'Error') {
        onPress();
      }
    });
  }

  return (
    <View key={u.id}>
      {u.id != user && 
        <Pressable 
          style={styles.horizontalItem}
          title={u.id} 
          onPress={() => createConversation(u.id)}>
          <View style={styles.horizontalItemImg}></View>
          <Text style={styles.horizontalItemText}>{u.firstname} {u.lastname}</Text>
        </Pressable>
      }
    </View>
  )
}
