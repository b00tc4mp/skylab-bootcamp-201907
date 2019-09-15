import React from 'react'

function Register({ onRegister }) {
    return ( <>
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
    </>
    )
}

export default Register