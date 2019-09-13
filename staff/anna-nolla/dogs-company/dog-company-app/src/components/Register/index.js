import React , { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'

function RegisterUser ({ history }) {
    const [error , setError] = useState(undefined)

    async function onRegister(name, surname, email, password, repassword){
        try {
            await logic.registerUser(name, surname, email, password, repassword)
                history.push('/login')
        } catch ({ message }) {      
            setError(message)
        }
    }

    return <>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password },  repassword: { value: repassword } } } = event
            onRegister(name, surname, email, password, repassword)
        }}>
            <label>Name</label>
                <input type="text" name="name" />
            <label>Surame</label>
                <input type="text" name="surname" />
            <label>Email</label>
                <input type="email" name="email" />
            <label>Password</label>
                <input type="password" name="password" />
            <label>Repeat Password</label>
                <input type="password" name="repassword" />
            <button>Proceed</button>
        </form>
        <button><Link to="/">Go back</Link></button>

        {error && <Feedback message ={error}/>}
    </>
}
export default withRouter(RegisterUser)