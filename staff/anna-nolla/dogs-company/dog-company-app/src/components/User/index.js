import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'
import Pet from '../Pet'
import Feedback from '../Feedback'
import MapUpdatePosition from '../Map-update-position'

function User() {

    const [error , setError] = useState(undefined)
    const { setUser, setView, addPet, setAddPet } = useContext(MyContext)
    const [_name , setName] = useState(undefined)
    const [_surname , setSurname] = useState(undefined)
    const [_email , setEmail] = useState(undefined)
    const [pets, setPets] = useState([])
    
    useEffect(() => {
        async function stateUser (){
            try{
                const { user } = await logic.retrieveUser()
                setPets(user.pets)
                setName(user.name)
                setSurname(user.surname)
                setEmail(user.email)
                setView('user')
            }catch({ message }){
                console.log(message)
            }
        }
        stateUser()
    }, [])
    
    function onAddPet(){
        setAddPet(!addPet)
    }

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
    async function onUnregister(petId){
        try{
            await logic.unregisterPet(petId)
                
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

           { pets.length >= 0 && <section>
            <h4>Owned pets:</h4>
            {pets.map(pet => (
                
                <ul>
                    <li>
                        <h6>Name:</h6>
                        <p>{pet.name}</p>
                    </li>
                    <li>
                        <h6>Age:</h6>
                        <p>{pet.age}</p>
                    </li>
                    <li>
                        <h6>Gender:</h6>
                        <p>{pet.gender}</p>
                    </li>
                    <li>
                        <h6>Size:</h6>
                        <p>{pet.size}</p>
                    </li>
                    <li>
                        <h6>Characteristics:</h6>
                        <p>{pet.characteristis}</p>
                    </li>
                    <form onSubmit = {event => {
                        event.preventDefault() 
                        onUnregister(event.target.petId.pet._id)
                    }}>
                        <input type = 'hidden' name = "petId" value= {pet._id}/>
                        <button>Unregister</button>
                    </form>
                </ul>
                ))
            }
        </section> }

            <button onClick = {onAddPet}> Register new Pet </button>
            { addPet && <Pet/> }
            
            <section>
                <p>where do you usualy walk</p>
                <MapUpdatePosition/>
            </section>
        </main>
    
}
export default withRouter(User)

{/* <UpdatePet/> */}