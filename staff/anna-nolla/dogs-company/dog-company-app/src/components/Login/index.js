import React, { useState } from 'react'
import { Link , withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'
    
function Login ({ history }) {
    const [error , setError] = useState(undefined)
    async function onLogIn(email, password){
        try {
            await logic.logIn(email, password)
                history.push('/home')

        } catch ({ message }) {
            setError(message)
        }
    }

    return <>
        <h2>Log In</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogIn( email, password)
        }}>
            <label>Email</label>
                <input type="email" name="email" />
            <label> Password</label>
                <input type="password" name="password" />
            <button>Proceed</button>
        </form>
        <button><Link to="/">Go back</Link></button>

        {error && <Feedback message ={error}/>}
    </>
}

export default withRouter(Login)