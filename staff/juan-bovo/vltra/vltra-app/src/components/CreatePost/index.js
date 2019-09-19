import React, {useState} from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'

import './style.sass'

function CreatePost({history}){
    const  [error, setError]  = useState(undefined)

    function handleSubmit(event){
        event.preventDefault()
        const { target : { title : { value : title } , body : { value : body } }} = event
        handleCreatePost(title, body)
    }

    async function handleCreatePost(title, body){
        try{
            await logic.createPost(title, body)
            history.push('/publish-success')
        }
        catch({ message }){
            console.log("error" , message)
            setError(message)
        }
    }

    return <section className="register">
        <h2 className="title register__title">Comparte un texto corto en Vltra</h2>
        <form onSubmit={handleSubmit} className="form register__form" id="postform">
            <label>Título<input className="register__form--field form__field" type="text" name="title" placeholder="El título de tu post" /></label>
            {/* <label>Contenido<input className="register__form--field form__field" type="text" name="body" placeholder="¡Escribe tu post!" /></label> */}

            <label>Contenido<textarea rows="4" cols="50" name="body" form="postform" placeholder="¡Escribe tu post! Recuerda: máximo de 2000 caracteres ;)"className="register__form--field form__field"></textarea></label>
            {error && <Feedback message ={error}/>}

            <button className="register__button form__button">¡Publicar!</button>
        </form>
        
        <p className="register__info form__info"><Link to="/">Volver a la página principal</Link></p>
    </section>
}

export default withRouter(CreatePost)