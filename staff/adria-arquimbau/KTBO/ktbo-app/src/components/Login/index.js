/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react'
import Context from '../Context'

import logic from '../../logic'
import { withRouter } from 'react-router-dom'

import Modal from '../Modal'

function Login({ history }) {
    
    const [message, setMessage] = useState(null)
    const {setUser} = useContext(Context)
    //const [error, setError] = useState(null)

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {
            const {  id, token } = await logic.authenticateUser(email, password)
            logic.userCredentials = { id, token }

            try {
                const user = await logic.retrieveUser()
                setUser(user)
            } catch (error) {
                //TODO
            }
        
            history.push('/home')
        } catch({message}) {
            setMessage(message)
        }
    }

    function handleModal() {
        setMessage(null) 
    }

    return <>
        <main className="login">
            <section className="login__content">
                <h2 className="login__title">Login</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input className="login__form--email" placeholder="e-mail" type="email" name="email" />
                    <input className="login__form--password" placeholder="password" type="password" name="password" />
                    <button className="login__form--button">Submit</button>
                </form>
                {message && <Modal message={message} showModal={handleModal}/>}
            </section>
        </main>  
    </>
}

export default withRouter(Login)