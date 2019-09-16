import React from 'react'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'

function CreateTeacher({ history }){
    debugger
    function handleSubmit(event){
        event.preventDefault()
        const {target:{ name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        handleRegister(name, surname, email, password)
    }
    
    async function handleRegister(name, surname, email, password){

        try{
            debugger
            await logic.registerUser(name, surname, email, password, 'teacher')
            console.log('register with success')
            document.getElementById('clear').value=""
            document.getElementById('clear1').value=""
            document.getElementById('clear2').value=""
            document.getElementById('clear3').value=""
        }catch(error){
            
            console.log(error.message)
        }
    }

    return <>
    <section>
        <h2>Create teacher</h2>
        <form onSubmit={handleSubmit}>
            <input id="clear" type="name" name="name" />
            <input id="clear1" type="surname" name="surname" />
            <input id="clear2" type="email" name="email" />
            <input id="clear3" type="password" name="password" />
            <button>Submit</button>
        </form>
        <Link to="/admin">Go Back</Link>
    </section>
</>
}
export default withRouter(CreateTeacher)