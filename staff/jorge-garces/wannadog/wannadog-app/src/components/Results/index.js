import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ onLogin }) {
    return <>
        <Link to="/">Back</Link>
        <h2>Search Results</h2>
        <p>------- or ---------</p>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>LOGIN</button>
        </form>

        <p>don't have an account? Sign-up!</p>
        <Link to="/register">Sign-up!</Link>
    </>
}