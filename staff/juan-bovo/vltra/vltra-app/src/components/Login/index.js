import React, {useState, useContext} from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'
import Context from '../ProviderContext'

import './style.sass'

function Login({history}){
    const  [error, setError]  = useState(undefined)

    function handleSubmit(event){
        event.preventDefault()
        const { target : { email : { value : email } , password : { value : password } }} = event
        handleLogin(email , password)
    }

    async function handleLogin(email , password){
        try{
            await logic.authenticateUser(email , password)
            history.push('/')
        }
        catch({ message }){
            console.log("error" , message)
            setError(message)
        }
    }
    return <section className="login">
        <h2 className="title login__title">Inicia sesión en Vltra</h2>
        <form onSubmit={handleSubmit} className="form login__form">
            <label>Email<input className="login__form--field form__field" type="email" name="email" placeholder="El email con el que te has registrado"/></label>
            <label>Contraseña<input className="login__form--field form__field" type="password" name="password" placeholder="Tu contraseña"/></label>
            {error && <Feedback message ={error}/>}

            <button className="login__button form__button">Iniciar sesión</button>
        </form>

        <p className="login__info form__info">¿Aún no tienes una cuenta? Entonces comienza por <Link to="/register" className="login__on-register anchor__link">registrarte en Vltra</Link> </p>
        <p className="login__info form__info"><Link to="/" className="login__on-register anchor__link">Volver a la página principal</Link></p>
    </section>
}

export default withRouter(Login)