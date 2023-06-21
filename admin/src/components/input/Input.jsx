import React from 'react';


export default function Input(props) {
  return (
    <input 
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
    />
  )
}
