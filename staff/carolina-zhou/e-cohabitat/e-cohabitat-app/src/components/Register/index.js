import React from 'react'
import logic from '../../logic/'
import { withRouter } from 'react-router-dom'

function Register({ history }) {

    function handleSubmit(event) {
            event.preventDefault()

            const { target: { username: { value: username }, name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

            handleRegister(username, name, surname, email, password)

    }

    async function handleRegister(username, name, surname, email, password) {

        try {
            await logic.registerUser(username, name, surname, email, password)

            history.push('/sign-up-success')
        } catch(error) {
            console.log(error.message)
        }

    }

    return <>
        <main class="main"> 
            <section class="register">
                <h1 class="register__title">Sign up</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="text" name="username" placeholder="username"/></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="text" name="name" placeholder="name"/></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="text" name="surname" placeholder="surname" /></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="email" name="email" placeholder="email"/></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="password" name="password" placeholder="password"/></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="password" name="repassword" placeholder="repeat password"/></label>
                        </li>
                        <button class="register__form-button">Register</button>
                    </ul>
                </form>
                <a href={`/`} class="register__back-link"><i class="fas fa-arrow-left"></i> Go back</a>
            </section>
        </main>
    </>
}

export default withRouter(Register)