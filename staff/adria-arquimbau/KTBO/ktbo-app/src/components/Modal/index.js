/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function Modal({message, showModal}) {
    
  return <>
      <div className="modal">
        <div className="modal__box">
          <p className="">{message}</p>
          <button onClick={showModal}>Ok</button>
        </div>
      </div>
  </>
}

export default Modal