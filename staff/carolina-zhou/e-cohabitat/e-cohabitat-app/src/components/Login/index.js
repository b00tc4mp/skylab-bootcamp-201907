import React, { useContext } from 'react'
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
            console.log('login successful')
        } catch(error) {
            console.log(error.message)
        }
    }

    return <>
        <main class="main"> 

            <section class="login">
                <h1 class="login__title">Sign in</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li class="login__form-item">
                            <label for="email"></label>
                            <input class="login__form-input" type="email" name="email" id="email"  placeholder="email"/>
                        </li>
                        <li class="login__form-item">
                            <label for="password"></label>
                            <input class="login__form-input" type="password" name="password" id="password" placeholder="password"/>
                        </li>
                    </ul>
                    <button class="login__form-button" type="submit">Log in</button>
                </form>
                
                <a href={`/`} class="login__back-link"><i class="fas fa-arrow-left"></i> Go back</a>
            </section>
        </main>
    </>
}

export default withRouter(Login)