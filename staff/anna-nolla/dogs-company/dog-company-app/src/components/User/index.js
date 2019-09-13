import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'
import Pet from '../Pet'
// import UpdatePet from '../UpdatePet'
import Feedback from '../Feedback'

function User() {
    const [error , setError] = useState(undefined)
    const { user, setUser, setView, addPet, setAddPet } = useContext(MyContext)

    const [_name , setName] = useState(undefined)
    const [_surname , setSurname] = useState(undefined)
    const [_email , setEmail] = useState(undefined)

    function onAddPet(){
        setAddPet(true)
    }

    useEffect(() => {
        async function stateUser (user){
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
        }
        stateUser(user)
    },[])

    async function onUpdateUser(_name, _surname, _email, newPassword, repassword){
        try{
            await logic.updateUser(_name, _surname, _email, newPassword, repassword)
            const { user } = await logic.retrieveUser()
                setUser(user)
                setView('user')
                
        }catch({ message }) {
            setError(message)
        }
    }

    return <main>
            <h4>Owners data:</h4>
            <form onSubmit = {event => {
                event.preventDefault()
                const {target: { name: { value: _name}, surname: { value: _surname }, email: { value: _email }, newPassword: { value: newPassword }, repassword: { value: repassword } } } = event
                onUpdateUser(_name, _surname, _email, newPassword, repassword)
            }}>
                <label>Name</label>
                    <input type = "text" name = "name"  value= {_name} onChange={ event => setName(event.target.value)}/>
                <label>Surname</label>
                    <input type = "text" name = "surname" value= {_surname} onChange={ event => setSurname(event.target.value)}/>
                <label>Email</label>
                    <input type = "email" name = "email" value= {_email} onChange={ event => setEmail(event.target.value)}/>
                <label>New password</label>
                    <input type = "password" name = "newPassword"/>
                <label>Repeat new password</label>
                    <input type = "password" name = "repassword"/>
                <button>Update</button>
            </form>
            {error && <Feedback message ={error}/>}

            {/* <UpdatePet/> */}

            <button onClick = {onAddPet}> Register new Pet </button>

            { addPet && <Pet/> }
            
            <section>
                <p>where do you usualy walk</p>
                <a href="google maps"></a>
            </section>
        </main>
    
}
export default withRouter(User)
