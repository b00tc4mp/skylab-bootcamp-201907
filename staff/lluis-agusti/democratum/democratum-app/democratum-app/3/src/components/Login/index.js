import React, {useState} from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

function Login ({ history, onLogin }) {

    const [error, setError] = useState(null)

    function handleSubmit(event) {
        event.preventDefault()

                const { target: { email: { value: email }, password: { value: password } } } = event

                handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {
            await logic.authenticateUser(email, password)
    
            //logic.__token__(__token__)
            history.push('./landingtwo')
            
        } catch ({message}) {
            setError(message)
        }
    }

    return <>
        <h2 className="formname">Log In</h2>
        <p className="formtitle">Access to your account.</p>
            <div className="containerform">
            <form onSubmit={handleSubmit}>
                <div className="containerinput">
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                </div>
                <button className="button-poll">Accept</button>
            </form>
            {error && <div className="feedlogin"><Feedback message={error} /></div>}
            </div>
    <ul>
        <p className="formtitle">Don't have an account yet?  <b><a href="#" onClick={event => {
            event.preventDefault()

            history.push('/register')
        }}>Sign Up</a></b></p>
    </ul>
    </>
}

export default withRouter(Login)