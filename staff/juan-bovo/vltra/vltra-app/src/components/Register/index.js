import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import './style.sass'

function Register(){
    return <>
    <section className="register">
        <h2 className="title register__title">Regístrate</h2>
        <form className="form register__form">
            <label>Nombre<input className="register__form--field form__field" type="text" name="name" placeholder="Ingresa tu nombre"/></label>
            <label>Apellido<input className="register__form--field form__field" type="text" name="surname" placeholder="Aquí va tu apellido"/></label>
            <label>Seudónimo<input className="register__form--field form__field" type="text" name="nickname" placeholder="Tu seudónimo"/></label>
            <label>Email<input className="register__form--field form__field" type="email" name="email" placeholder="Un correo electrónico"/></label>
            <label>Contraseña<input className="register__form--field form__field" type="password" name="password" placeholder="Una contraseña"/></label>
            <label>Repite contraseña<input className="register__form--field form__field" type="password" name="repassword" placeholder="Repite la contraseña anterior"/></label>
            
            <button className="register__button form__button">¡Registrarme!</button>
        </form>
    </section>
</>
}

export default Register