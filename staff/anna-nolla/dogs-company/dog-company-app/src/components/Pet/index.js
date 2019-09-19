import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'
import Feedback from '../Feedback'

function Pet() {
    const [error , setError] = useState(undefined)
    const { setUser , setView, setAddPet } = useContext(MyContext)

    async function onRegisterPet(petName, age, gender, size, characteristics){
        try{
            await logic.registerPet(petName, age, gender, size, characteristics)
            const { user } = await logic.retrieveUser()
                setUser(user)
                setView('user')
                setAddPet(false)
        }catch({ message }) {
            setError(message)
        }
    }

    return <section className = 'pet'>
            <h4 className = 'pet_title'>Pet information:</h4>
            <form className = 'pet_form' onSubmit = {event => {
                event.preventDefault()
                const { target: { petName: { value: petName }, age: { value: age }, gender: { value: gender }, size: { value: size },  characteristics: { value: characteristics } } } = event
                onRegisterPet(petName, age, gender, size, characteristics)
            }}>
                <label className = 'pet_form_text'>Name</label>
                    <input className = 'pet_form_input' type = "text" name = "petName"/>
                <label className = 'pet_form_text'>Age</label>
                    <input className = 'pet_form_input' type = "date" name = "age"/>
                <label className = 'pet_form_text'>Gender</label>
                   <div>
                        Male <input className = 'pet_form_input' type = "radio" name = "gender" value = {true}/>
                        Female <input className = 'pet_form_input' type = "radio" name = "gender" value = {false}/>
                   </div>
                <label className = 'pet_form_text'>Size</label>
                    <input className = 'pet_form_input' type = "text" name = "size"/>
                <label className = 'pet_form_text'>Characteristics</label>
                    <input className = 'pet_form_input' type = "text" name = "characteristics"/> 
                {error && <Feedback message ={error}/>}
                <button className = 'pet_form_button'>Add</button>
            </form>
        </section> 
}

export default withRouter(Pet)