import * as React from 'react';
import { 
  View, 
  Pressable, 
  Text, 
} from 'react-native';

import { secureRequest } from '../../security/Api';
import { AuthState } from '../../security/Context';
import socket from '../../utils/socket';

import styles from '../../style/style';

/**
 * @param {*} u List of users returned by request
 * @param {*} navigation Usefull for navigate method
 */
export default function PublicUser({ u, navigation }) {

  const { user } = React.useContext(AuthState);
  const [initials, setInitials] = React.useState('');

  const handleInitials = async (item) => {
    if(item.id != user)
    setInitials(item.firstname[0] + item.lastname[0]);
  }

  const createConversation = async (id) => {
    await secureRequest(
      `user/${user}/conversation/${id}`, 
      'POST',
    )
    .then((res) => {
      if(res.status != 'Error') {
        socket.emit('create-conversation', `${user}--with--${u.id}`);
      }
      if(res.status == 'Error' && res.message == 'Already done') {
        secureRequest(
          `user/${user}/conversation/${u.id}`,
          'GET',
        )
        .then((res) => {
          return navigation.navigate('Conversation', {
            id: res.data.id,
            name: u.firstname + u.lastname,
            user_to: u.id,
          })
        });
      }
    });
  }

  React.useEffect(() => {
    handleInitials(u);
  }, [user])

  return (
    <View key={u.id}>
      {u.id != user && 
        <Pressable 
          style={styles.horizontalItem}
          title={u.id} 
          onPress={() => createConversation(u.id)}>
          <View style={styles.horizontalItemImg}>
            <Text style={styles.whiteText}>{initials}</Text>
          </View>

          <Text style={styles.horizontalItemText}>{u.firstname} {u.lastname}</Text>
        </Pressable>
      }
    </View>
  )
}
