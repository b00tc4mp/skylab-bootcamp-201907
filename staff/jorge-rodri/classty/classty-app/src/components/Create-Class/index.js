import React from 'react'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'

function CreateClass({ history }){
    
    function handleSubmit(event){
        event.preventDefault()
        debugger
        const {target:{ nameClass: { value: nameClass } } } = event
        handleRegister(nameClass)
    }
    
    async function handleRegister(nameClass){

        try{
            
            await logic.registerClass(nameClass)
            
            history.push('/admin')
        }catch(error){
            
            console.log(error.message)
        }
    }

    return <>
    <section>
        <h2>Create Class</h2>
        <form onSubmit={handleSubmit}>
            <input type="name" name="nameClass" />
            <button>Submit</button>
        </form>
        <Link to="/admin">Go Back</Link>
    </section>
</>
}
export default withRouter(CreateClass)