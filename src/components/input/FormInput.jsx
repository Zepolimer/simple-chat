import * as React from 'react';
import { TextInput } from 'react-native';

import styles from '../../style/style';


const FormInput = (props) => {
  return (
    <TextInput
      style={props.style ? props.style : styles.input}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      autoCapitalize="none"
      placeholderTextColor="#aaa"
      multiline={props.lines ? true : false}
      numberOfLines={props.lines ? props.lines : 1}
    />
  )
}

export default FormInput