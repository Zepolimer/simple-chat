import * as React from 'react';
import { 
  Pressable, 
  Text, 
  View 
} from 'react-native';
import { AuthState } from '../../security/Context';

import styles from '../../style/style';
import socket from '../../utils/socket';

/**
 * @param {*} conversation List of conversations returned by request
 * @param {*} navigation Usefull for navigate method
 */
export default function UserConversations({ conversation, navigation }) {

  const { user } = React.useContext(AuthState);
  const [initials, setInitials] = React.useState('');
  const [userTo, setUserTo] = React.useState(0);

  const handleInitials = async (item) => {
    if(user == item.id_from.id) {
      setInitials(item.id_to.firstname.charAt(0) + item.id_to.lastname.charAt(0))
      setUserTo(item.id_to.id);
    } else {
      setInitials(item.id_from.firstname.charAt(0) + item.id_from.lastname.charAt(0))
      setUserTo(item.id_from.id);
    }
  }

  const messageSendBy = async (item) => {
    let routename = '';

    if(user == item.id_from.id) {
      routename = item.id_to.firstname + " " + item.id_to.lastname
      socket.emit('join-conversation', `${user}--with--${item.id_to.id}`);
    } else {
      routename = item.id_from.firstname + " " + item.id_from.lastname
      socket.emit('join-conversation', `${user}--with--${item.id_from.id}`);
    }

    return navigation.navigate('Conversation', {
      id: item.id,
      name: routename,
      user_to: userTo,
    })
  }

  React.useEffect(() => {
    handleInitials(conversation);
  }, [user])

  return (
    <View key={conversation.id} style={styles.chatWrapper}>
      <Pressable
        style={styles.chatBtn}
        title={conversation.id}
        onPress={() => messageSendBy(conversation)}
      >
        <View style={styles.horizontalItemImg}>
          <Text style={styles.whiteText}>{initials}</Text>
        </View>

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
