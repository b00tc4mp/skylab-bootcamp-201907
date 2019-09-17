import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function PublishSuccess(){
    return <section>
        <h2 className="form__title">¡Tu post se ha publicado! :)</h2>

        <p className="form__info">Ahora ya puedes verlo en la pantalla principal de Vltra.</p>

        <p className="form__info">¿Quieres comprobarlo? ¡<Link to="/" className="anchor__link">Revisa la portada</Link>!</p>
    </section>
}


export default withRouter(PublishSuccess)