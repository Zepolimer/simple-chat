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


export default function PublicChannel({ channel, user, access, navigation }) {

  const postJoinChannel = async (id) => {
    await secureFastPostRequest(
      `user/${user}/channel/${id}`, 
      access
    )
    .then((res) => {
      navigation.navigate('Channel', {
        id: id,
      })
    })
  }

  return (
    <View key={channel.id}>
      <Pressable 
        style={styles.horizontalItemGroupe}
        title={channel.id} 
        onPress={() =>  postJoinChannel(channel.id)}
      > 
        <Text style={styles.horizontalItemTextGroupe}>
        {channel.name}
        </Text>
      </Pressable>
    </View>
  )
}