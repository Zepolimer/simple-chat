import React from 'react'

function Modal(props) {
  return (
    <div className='modal-container'>
      <aside className='modal'>
        <p>Voulez-vous définitivement supprimer {props.identify} "{props.item}" ?</p>
        <div className='modal-buttons'>
          <button onClick={props.cancelMethod} className='black-button'>Annuler</button>
          <button onClick={props.deleteMethod} className='red-button'>Supprimer</button>
        </div>
      </aside>
    </div>
  )
}

export default Modal