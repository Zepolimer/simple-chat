import React from 'react'

export default function SecureInput(props) {
  return (
    <input 
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      type='password'
    />
  )
}
