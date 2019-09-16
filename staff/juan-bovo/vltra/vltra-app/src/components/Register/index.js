import React, {useState} from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'

import './style.sass'

function Register({ history }){

    const  [error, setError]  = useState(undefined)

    function handleSubmit(event){
        event.preventDefault()
        const { target : { name : { value : name } , surname : { value : surname } , nickname : { value : nickname } , email : { value : email } , password : { value : password } , repassword : { value : repassword } }} = event
        handleRegister(name , surname , nickname , email , password , repassword)
    }

    async function handleRegister(name , surname , nickname , email , password , repassword){
        try{
            await logic.registerUser(name , surname , nickname , email , password , repassword)
            history.push('/register-success')
        }
        catch({ message }){
            console.log("error" , message)
            setError(message)
        }
    }

    return <section className="register">
        <h2 className="title register__title">Regístrate</h2>
        <form onSubmit={handleSubmit} className="form register__form">
            <label>Nombre<input className="register__form--field form__field" type="text" name="name" placeholder="Ingresa tu nombre" /></label>
            <label>Apellido<input className="register__form--field form__field" type="text" name="surname" placeholder="Aquí va tu apellido" /></label>
            <label>Seudónimo<input className="register__form--field form__field" type="text" name="nickname" placeholder="Tu seudónimo" /></label>
            <label>Email<input className="register__form--field form__field" type="email" name="email" placeholder="Un correo electrónico" /></label>
            <label>Contraseña<input className="register__form--field form__field" type="password" name="password" placeholder="Una contraseña" /></label>
            <label>Repite contraseña<input className="register__form--field form__field" type="password" name="repassword" placeholder="Repite la contraseña anterior" /></label>
            {error && <Feedback message ={error}/>}

            <button className="register__button form__button">¡Registrarme!</button>
        </form>
        
        <p className="register__info form__info">¿Ya tienes una cuenta en Vltra? ¡<Link to="/login" className="register__on-login anchor__link">Inicia sesión</Link>!</p>
        <p className="register__info form__info"><Link to="/">Volver a la página principal</Link></p>
    </section>

}

export default withRouter(Register)