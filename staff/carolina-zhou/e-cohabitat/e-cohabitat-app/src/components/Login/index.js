import React, { useState } from 'react'
import logic from '../../logic/'
import Feedback from '../Feedback'
import { withRouter } from 'react-router-dom'

function Login({ history }) {

    const  [error, setError]  = useState()

    function handleSubmit(event) {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {
            await logic.authenticateUser(email, password)
        
            history.push('/home')
        } catch({ message }) {
            setError(message)
        }
    }

    function handleBack(event) {
        event.preventDefault()

        history.push(`/`)
    }

    return <section className="login">

            <h1 className="login__title">Sign in</h1>

            <form onSubmit={ handleSubmit }>
                <ul>
                    <li className="login__form-item">
                        <label htmlFor="email"></label>
                        <input className="login__form-input" type="email" name="email" id="email"  placeholder="email"/>
                    </li>
                    <li className="login__form-item">
                        <label htmlFor="password"></label>
                        <input className="login__form-input" type="password" name="password" id="password" placeholder="password"/>
                    </li >
                    {error &&
                    <li className="login__form-item">
                        <Feedback message={error}/>
                    </li> }
                    <li className="login__form-item">
                        <button className="login__form-button" type="submit">Log in</button>
                    </li>
                </ul>
            </form>
            
            <a href="#" className="login__back-link"><i className="fas fa-arrow-left" onClick={handleBack}></i> Go back</a>

    </section>
}

export default withRouter(Login)