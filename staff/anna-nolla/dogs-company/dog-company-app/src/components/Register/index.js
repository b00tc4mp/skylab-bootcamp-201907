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

    return <main className = 'register'>
        <h2 className= 'register_title'>Register</h2>
        <form className = 'register_form' onSubmit={event => {
            event.preventDefault()
            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password },  repassword: { value: repassword } } } = event
            onRegister(name, surname, email, password, repassword)
        }}>
            <label className = 'register_text'>Name</label>
                <input className = 'register_input' type="text" name="name" />
            <label className = 'register_text'>Surame</label>
                <input className = 'register_input' type="text" name="surname" />
            <label className = 'register_text' >Email</label>
                <input className = 'register_input' type="email" name="email" />
            <label className = 'register_text' >Password</label>
                <input className = 'register_input' type="password" name="password" />
            <label className = 'register_text' >Repeat Password</label>
                <input className = 'register_input' type="password" name="repassword" />
        {error && <Feedback message ={error}/>}
            <button className = 'register_button'>Proceed</button>
        </form>
        <button className = 'register_back' ><Link className = 'register_back-text' to="/">Go back</Link></button>

    </main>
}
export default withRouter(RegisterUser)