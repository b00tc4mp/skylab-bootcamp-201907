import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'
import Pet from '../Pet'
import Feedback from '../Feedback'
import MapUpdatePosition from '../MapUpdatePosition'
import moment from'moment'

function User() {

    const [error , setError] = useState(undefined)
    const { setUser, addPet, setAddPet, user } = useContext(MyContext)
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
            }catch({ message }){
                console.log(message)
            }
        }
        stateUser()
    }, [user])
    
    function onAddPet(){
        setAddPet(!addPet)
    }

    async function onUpdateUser(_name, _surname, _email, newPassword, repassword){
        try{
            await logic.updateUser(_name, _surname, _email, newPassword, repassword)
            const { user } = await logic.retrieveUser()
                setUser(user)                
        }catch({ message }) {
            setError(message)
        }
    }

    async function onUnregister(petId){
        try{
            await logic.unregisterPet(petId)
            const { user } = await logic.retrieveUser()
            setUser(user)
        }catch({ message }) {
            setError(message)
        }
    }

    return <main className = 'profile'>
            <h4 className = 'profile_title'>Owners data:</h4>
            <form className = 'profile_form' onSubmit = {event => {
                event.preventDefault()
                const {target: { newPassword: { value: newPassword }, repassword: { value: repassword } } } = event
                onUpdateUser(_name, _surname, _email, newPassword, repassword)
            }}>
                <label className = 'profile_form_text'>Name</label>
                    <input className = 'profile_form_input' type = "text" name = "name"  value= {_name} onChange={ event => setName(event.target.value)}/>
                <label className = 'profile_form_text'>Surname</label>
                    <input className = 'profile_form_input' type = "text" name = "surname" value= {_surname} onChange={ event => setSurname(event.target.value)}/>
                <label className = 'profile_form_text'>Email</label>
                    <input className = 'profile_form_input' type = "email" name = "email" value= {_email} onChange={ event => setEmail(event.target.value)}/>
                <label className = 'profile_form_text'>New password</label>
                    <input className = 'profile_form_input' type = "password" name = "newPassword"/>
                <label className = 'profile_form_text'>Repeat new password</label>
                    <input className = 'profile_form_input' type = "password" name = "repassword"/>
                    {error && <Feedback message ={error}/>}
                <button className = 'profile_form_buttom-update'>Update</button>
            </form>


            {pets && pets.length > 0 && <h4 className = 'profile_section_title'>Owned pets:</h4>}
            {pets && pets.length > 0 && <section className = 'profile_section'>
            {pets.map(pet => (
                <ul className = 'profile_section_ul' key = {pet._id}>
                    <li className = 'profile_section_ul_li'><p className = 'profile_section_ul_li_p'>Name: {pet.name}</p></li>
                    <li className = 'profile_section_ul_li'><p className = 'profile_section_ul_li_p'>Age: {moment(pet.age).utc().format('DD-MM-YY')}</p></li>
                    <li className = 'profile_section_ul_li'><p className = 'profile_section_ul_li_p'>Gender: {pet.gender ? 'Male' : 'Female'}</p></li>
                    <li className = 'profile_section_ul_li'><p className = 'profile_section_ul_li_p'>Size: {pet.size}</p></li>
                    <li className = 'profile_section_ul_li'><p className = 'profile_section_ul_li_p'>Characteristics: {pet.characteristics}</p></li>

                    <form onSubmit = {event => {
                        event.preventDefault() 
                        onUnregister(event.target.petId.value)
                    }}>
                        <input type = 'hidden' name = "petId" value = {pet._id}/>
                        <button className = 'profile_form_button'>Unregister</button>
                    </form>
                </ul>
                ))
            }
        </section> }

            <button className ='profile_button' onClick = {onAddPet}> Register new Pet </button>
            { addPet && <Pet/> }
            
            <section className = 'profile_map-section'>
                <p className = 'profile_map-section_text' >Where do you usualy walk ?</p>
                <MapUpdatePosition/>
            </section>
        </main>
    
}
export default withRouter(User)