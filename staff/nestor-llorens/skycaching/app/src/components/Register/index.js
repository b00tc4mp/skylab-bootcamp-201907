import React, { useState } from 'react'
import Feedback from '../Feedback'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'



function Register({ history }) {
    const [error, setError] = useState()


    const handleRegister = async (username, password, email) => {
        try {
          await logic.registerUser(username, password, email)
    
          history.push('/login')
        } catch ({ message }) {
          setError(message)
        }
      }


    return (<>
        <main className='register'>
            <h2 className='register__header'>Create account</h2>
            <form className='register__form' onSubmit={event => {
                event.preventDefault()

                const { target: { username: { value: username }, email: { value: email }, password: { value: password } } } = event
                handleRegister(username, password, email)
                
            }}>

                <label className='register__form-label'htmlFor="username">Username</label>
                <input className='register__form-input'type="text" name="username" />
                <label className='register__form-label'htmlFor='password'>Password</label>
                <input className='register__form-input'type="password" name="password" />
                <label className='register__form-label'htmlFor="email">Email</label>
                <input className='register__form-input'type="email" name="email" />
                {error && <Feedback message={error}/>}
                <button className='register__form-button'>Create account</button>
            </form>

            
        </main>
    </>
    )
}

export default withRouter(Register)