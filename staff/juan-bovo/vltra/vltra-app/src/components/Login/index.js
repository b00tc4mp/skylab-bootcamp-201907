import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import './style.sass'

function Login(){
    return <>
    <section className="login">
        <h2 className="title login__title">Inicia sesión en Vltra</h2>
        <form className="form login__form">
            <label>Email<input className="login__form--field form__field" type="email" name="email" placeholder="El email con el que te has registrado"/></label>
            <label>Contraseña<input className="login__form--field form__field" type="password" name="password" placeholder="Tu contraseña"/></label>
            
            <button className="login__button form__button">Iniciar sesión</button>
        </form>
    </section>
</>
}

export default Login