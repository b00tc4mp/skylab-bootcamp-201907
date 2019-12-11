import React, { useState} from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

function Register({ history }) {
    const  [error, setError]  = useState()

      function handleSubmit(event) {
        event.preventDefault()
        const { target: { name: {value:name}, surname: {value:surname}, email: { value: email }, password: { value: password } } } = event
       handleRegister(name, surname, email, password)
      }

      async function handleRegister(name, surname, email, password) {
        try {
          let domain = window.location.hostname
            await logic.registerUser(name, surname, email, password, domain)
            
            history.push('/auth')
        } catch(message) { 
            const translatedMessage = logic.translateMessage(message.message, email)
            setError(translatedMessage)
        }
    }

    return <>
       
        <div className="form-panel">

        <section class = "modal">
        <div class="modal-content">
          <div class="modal__-header">
          <span ><a class="close"href={`/#/`} >&times;</a></span>
            <h2 class="register-title">Regístrate</h2>
          </div>
          <div class="modal__body">
          <form onSubmit={handleSubmit}>
                <label for="">Nombre</label>
                <input class="modal__input" type="text" name="name" id=""/>
                <label for="">Apellido</label>
                <input class="modal__input" type="text" name="surname" id=""/>
                <label for="">Email</label>
                <input class="modal__input" type="email" name="email" id=""/>
                <label for="">Contraseña</label>
                <input class="modal__input" type="password" name="password" id=""/>
                {error && <Feedback className ="feedback" message={error} />} 

                <p class="modal__p">¿Ya estas registrado en nuestra web? <a href={`/#/auth`}>Accede</a></p>
                <button class= "modal__button">Regístrate</button>
            </form>
          </div>
        </div>

      </section>
        </div>
    </>
}

export default withRouter(Register)