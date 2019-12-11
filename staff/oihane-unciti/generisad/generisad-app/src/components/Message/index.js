import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter, Link, Route, Redirect } from 'react-router-dom'
import Nav from "../Nav"
import Footer from "../Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPaperPlane } from '@fortawesome/free-solid-svg-icons'

 

function Message ({ history }) {
    const [mails, setMails] = useState()
    

    const userEmail = logic.userEmail

    
        useEffect(() => {
            (async () => {
                try{
                    const _mails = await logic.retrieveMessage()
                    setMails(_mails)

                }catch(error){
                    console.log(error.message)
                }
            
            })()
        }, [])

    return <>
    
    <Nav />

    <section className= "message">
        <h2>Mis mensajes</h2>
            <ul className= "message__ul" >
            
            {mails && mails.length && mails.map(item => <li  className= "message__li"  key={item._id}>
            
                    {(userEmail===item.sender.email)? 
                        <p className="message__send">Enviado por: Ti </p>
                        :
                        <p className="message__send">Enviado por: {item.sender.email}</p>
                        }

                        {(userEmail===item.receiver.email)? 
                        <p className="message__send">Enviado a : Ti </p>
                        :
                        <p className="message__send">Enviado a : {item.sender.email}</p>
                        }
                            <p className= "message__date">{new Date(item.date).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            <p className= "message__title">{item.title}</p>
                            <p className= "message__body">{item.body}</p>

                            <Link to={`/response/${item._id}`} ><FontAwesomeIcon className="message__icon" icon={faPaperPlane} size="50px" color="gray"/></Link>
                                
            </li>)||<li className="message__none">Todavía no has iniciado ninguna conversación</li>}
        </ul>

    </section>

    
    <Footer/>
    </>
}
export default withRouter(Message)