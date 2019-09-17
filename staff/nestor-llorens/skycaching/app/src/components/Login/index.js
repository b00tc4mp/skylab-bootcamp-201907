import React from 'react'

function Login ({ onLogin }) {
    return ( <>
        <h2>Login</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            onLogin(username, password)
        }}>
            <input type="username" name="username" />
            <input type="password" name="password" />
            <button>Proceed</button>
        </form>
    </>
    )
}

export default Login