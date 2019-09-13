import React from 'react'
import logic from '../../logic/'
import { withRouter } from 'react-router-dom'

function Login({ history }) {

    function handleSubmit(event) {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {
            await logic.authenticateUser(email, password)
        
            history.push('/home')
        } catch(error) {
            console.log(error.message)
        }
    }

    return <>
        <main className="main"> 

            <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li className="login__form-item">
                            <label for="email"></label>
                            <input className="login__form-input" type="email" name="email" id="email"  placeholder="email"/>
                        </li>
                        <li className="login__form-item">
                            <label for="password"></label>
                            <input className="login__form-input" type="password" name="password" id="password" placeholder="password"/>
                        </li>
                    </ul>
                    <button className="login__form-button" type="submit">Log in</button>
                </form>
                
                <a href={`/`} className="login__back-link"><i className="fas fa-arrow-left"></i> Go back</a>
            </section>
        </main>
    </>
}

export default withRouter(Login)