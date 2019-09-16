import React from 'react'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'

function Register({ history }){
    
    function handleSubmit(event){
        event.preventDefault()
        const {target:{ name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        handleRegister(name, surname, email, password)
    }
    
    async function handleRegister(name, surname, email, password){

        try{
            
            await logic.registerUser(name, surname, email, password)
            
            history.push('/login')
        }catch(error){
            
            console.log(error.message)
        }
    }

    return <>
    <section>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="name" name="name" />
            <input type="surname" name="surname" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Submit</button>
        </form>
        <Link to="/">Go Back</Link>
    </section>
</>
}
export default Register