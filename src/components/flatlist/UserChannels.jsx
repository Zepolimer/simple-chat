import * as React from 'react';
import { 
  Pressable, 
  Text, 
  View 
} from 'react-native';

import styles from '../../style/style';


export default function UserChannels({ channel, navigation }) {
  return (
    <View key={channel.id}>
      <Pressable 
        style={styles.chatBtn}
        title={channel.Channel.id} 
        onPress={() => { navigation.navigate('Channel', {
            id: channel.Channel.id,
            name: channel.Channel.name,
        })}
      }>
        <Text style={styles.chatText}>
        {channel.Channel.name}
        </Text>
        <Text style={styles.grayText}> ({channel.Channel.private ? 'privé' : 'public'})</Text>
      </Pressable>
    </View>
  )
}