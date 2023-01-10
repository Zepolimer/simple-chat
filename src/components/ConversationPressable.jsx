import * as React from 'react';
import { Pressable } from 'react-native';

import styles from '../style/style';


const ConversationPressable = (props, {children}) => {
  return (
    <Pressable
      style={styles.blackBtn}
      title={props.title}
      onPress={props.onPress}
    >
      {children}
    </Pressable>
  )
}

export default ConversationPressable