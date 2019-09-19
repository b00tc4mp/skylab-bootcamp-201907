import React, { useState } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import Nav from "../Nav"
import Footer from "../Footer"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { withRouter } from 'react-router-dom'

function Response ({ history }) {

    const _id =history.location.pathname.slice(10)
    
    const  [error, setError] = useState()
    
    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: {value:title}, body: {value:body} } } = event
       handleResponse(title, body)
    }

    async function handleResponse(title, body) {
        
        try {
            let domain = window.location.hostname
            await logic.response(_id, title,body, domain)
            history.push('/message')
        } catch(message) {
            const translatedMessage = logic.translateMessage(message.message )
            setError(translatedMessage)
        }
    }

    return <>

    <Nav/>
    
    <section className="email">

        <h1 className="email__title">Mensaje</h1>

        <form onSubmit={handleSubmit}>
                <label for="">Titulo</label>
                <input className="email__write" type="text" name="title" id=""/>
                <label for="">Contenido</label>
                <textarea className="email__write--description" type="text" name="body" id=""></textarea>
                {error && <Feedback message={error} />}
                <button class="email__button"><FontAwesomeIcon icon={faPaperPlane} size="50px" color="gray"/> Enviar</button>
        </form>

    </section>
    <Footer/>
   
</>
}

export default withRouter(Response)