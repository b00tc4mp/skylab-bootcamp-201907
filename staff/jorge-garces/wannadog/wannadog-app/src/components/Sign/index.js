import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'

export default withRouter(function ({ onLogin, history }) {


    { logic.isUserLoggedIn() && history.push('/profile') }
    return <>
        <Link to="/">Back</Link>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>LOGIN</button>
        </form>

        <p>don't have an account? <Link to="/register">Sign-up!</Link></p>
    </>
})