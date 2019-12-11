import React, { useState, useContext } from 'react'
import Context from '../Context'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'


function Login({ history }) {
    
  const { } = useContext(Context)
  const  [error, setError]  = useState()
  
  function handleSubmit(event) {
      event.preventDefault()
      const { target: { email: { value: email }, password: { value: password } } } = event
      handleLogin(email, password)
  }

  async function handleLogin(email, password) {
      try {
          let domain = window.location.hostname
          await logic.authenticateUser(email, password, domain)
          
          history.push('/')
      } catch({message}) {
          const translatedMessage = logic.translateMessage(message , email)
            setError(translatedMessage)
        
      }
  }
    return <>
        
        <div className="form-panel">

        <section class = "modal">
        <div class="modal-content">
          <div class="modal__-header">
            <span ><a class="close" href={`/#/`} >&times;</a></span>
            <h2 class="register-title">Accede</h2>
          </div>
          <div class="modal__body">
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input class="modal__input" type="email" name="email" id=""/>
                <label htmlFor="">Contraseña</label>
                <input class="modal__input" type="password" name="password" id=""/>

                <p class="modal__p">¿Todavia no tienes cuenta? <a href={`/#/register`}>Regístrate</a></p>
                {error && <Feedback className ="feedback" message={error} />} 
                <button class= "modal__button">Accede</button>
            </form>
            
          </div>
        </div>
      
      </section>
  
      </div>
    </>
}
export default withRouter(Login)