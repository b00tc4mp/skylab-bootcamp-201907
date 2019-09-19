import React, { useState } from 'react'
import { Link , withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'
    
function Login ({ history }) {
    const [error , setError] = useState(undefined)

    async function onLogIn(email, password){
        try {
            await logic.logUserIn(email, password)
                history.push('/home')

        } catch ({ message }) {
            setError(message)
        }
    }

    return <main className = 'login'>
        <h2 className = 'login_title'>Log In</h2>
        <form className = 'login_form' onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event
            onLogIn( email, password)
        }}>
            <label className = 'login_text'>Email</label>
                <input className = 'login_input' type="email" name="email" />
            <label className = 'login_text'> Password</label>
                <input className = 'login_input' type="password" name="password" />
        {error && <Feedback message ={error}/>}
            <button className = 'login_button'>Proceed</button>
        </form>
        <button className = 'login_back'><Link className = 'login_back-text' to="/">Go back</Link></button>

    </main>
}

export default withRouter(Login)