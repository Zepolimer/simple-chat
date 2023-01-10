import * as React from 'react';
import { Pressable, Text } from 'react-native';

import styles from '../style/style';


const BlackPressable = (props) => {
  return (
    <Pressable
      style={styles.blackBtn}
      title={props.title}
      onPress={props.onPress}
    >
      <Text style={styles.blackBtnText}>{props.text}</Text>
    </Pressable>
  )
}

export default BlackPressable