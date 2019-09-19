import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function RegisterSuccess(){
    return <section className="register" >
        <h2 className="form__title">¡Registro exitoso!</h2>

        <p className="form__info">Has sido correctamente registrado como usuario de Vltra. Ahora puedes iniciar sesión como usuario para publicar tus historias cortas y votar tus preferidas.</p>
        <p className="form__info">Recuerda: el límite es el cielo... o 2000 caracteres <em>(lo que suceda primero)</em>.</p>

        <p className="form__info">¿Listo para empezar? Entonces ya puedes <Link to="/login" className="anchor__link">iniciar sesión</Link>!</p>
    </section>
}


export default withRouter(RegisterSuccess)