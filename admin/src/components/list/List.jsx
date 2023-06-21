import React from 'react';
import { NavLink } from "react-router-dom";

function List(props) {
  return (
    <div className='line'>
      {props.navigateTo ? (
        <NavLink to={`${props.navigateTo}`} className='uppercase blue-text'>
          <p>{props.content}</p>
        </NavLink>
      ) : (
        <p className='uppercase'>{props.content}</p>
      )}

      <button onClick={props.openModal} className='red-button'>Supprimer</button>
    </div>
  )
}

export default List