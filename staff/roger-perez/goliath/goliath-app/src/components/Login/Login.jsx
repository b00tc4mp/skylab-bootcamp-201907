import React from 'react'
import Feedback from '../Feedback'

function Login({ onLogin, onBack, error }) {

    const handleLogin = event => {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        onLogin(email, password)
    }
    return (
        <>
        <div className="login">
            <h1>Login</h1>
            {error && <Feedback message={error} />}
            <form className='registerForm' onSubmit={event => handleLogin(event)}>
                <label className="label">E-mail</label>
                <input type="email" name="email" />  
                <label className="label">Password</label>
                <input type="password" name="password" />
                <br/>
                <button>Login</button>
            </form>
          
            <a className="loginGoBack"href="" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</a>

        </div>
        </>
    )
}
export default Login