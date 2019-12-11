import React, {useState} from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

function Login({ history, setView
 }) {

    const [error, setError] = useState()

    const handleLogin = async (email, password) => {
        try {
          await logic.authenticateUser(email, password)
          history.push('/')
          setView('home')
    
        } catch ({ message }) {
          setError(message)
        }
      }

    return (<>
        <main className='login'>
            <h2 className='login__header'>Sign in</h2>
            <form className='login__form' onSubmit={event => {
                event.preventDefault()

                const { target: { username: { value: username }, password: { value: password } } } = event

                handleLogin(username, password)
            }}>
                <label className='login__form-label'htmlFor="username">Username</label>
                <input className='login__form-input' type="username" name="username" />
                <label className='login__form-label'htmlFor="password">Password</label>
                <input className='login__form-input' type="password" name="password" />
                {error && <Feedback message={error}/>}
                <button className='login__form-button'>Sign in</button>
            </form>
        </main>
    </>
    )
}

export default withRouter(Login)