import React from 'react'

export default function ({ onBack, onRegister }) {
    return <>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, email: { value: email }, password: { value: password } } } = event

            onRegister(username, password, email)
        }}>
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="email" name="email" />
            
            <button>Proceed</button>
        </form>
        <a href="#" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}