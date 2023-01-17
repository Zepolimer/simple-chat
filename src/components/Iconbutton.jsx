import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';

import styles from '../style/style';


const IconButton = (props) => {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    setIcon(props.iconName);
  })

  return (
    <Pressable
      style={styles.keyboardBtn}
      title={props.title}
      onPress={props.onPress}
    >
      <Ionicons
        name={icon}
        color={'white'} 
        size={'20px'}
      />
    </Pressable>
  )
}

export default IconButton