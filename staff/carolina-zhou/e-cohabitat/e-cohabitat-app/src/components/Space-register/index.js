import React, { useContext, useState } from 'react'
import logic from '../../logic'
import Context from '../context'
import {Redirect} from 'react-router-dom'

export default function() {

    const { view, setView } = useContext(Context)
    const [type,setType] = useState("")
    const { id } = sessionStorage


    debugger
    function handleSubmit(event) {
            event.preventDefault()
            let picture
            const { target: { title: { value: title }, address: { value: address }, passcode: { value: passcode }} } = event
            debugger
            
            if (type === 'kitchen') picture = 'kitchen-1.jpg'
            if (type === 'bathroom')  picture = 'bathroom-1.jpg'
            if (type === 'living room')  picture = 'living-1.jpg'
            if (type === 'coworking')  picture = 'coworking-1.jpg'
            if (type === 'garden')  picture = 'garden-1.jpg'

            handleRegister(title, type, picture, address, passcode, id)

    }

    async function handleRegister(title, type, picture, address, passcode, id) {

        try {
            await logic.registerSpace(title, type, picture, address, passcode, id)
            setView('home')
            console.log('register successful')
        } catch(error) {
            console.log(error.message)
        }

    }
    
    debugger
    function checkSelectOption(option){
        const element = document.getElementById('otherInputOption')
        option = document.getElementById("typeSelector").value
        if (option === 'other') {
           element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
        setType(option)
    }
    
    return <>
        {view==="home" && <Redirect to="/home"/>}
        <main class="main"> 
            <section class="register">
                <h1 class="register__title">Add a space to cohabit!</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li class="register__form-item">
                            <select name="type" form="space type" id="typeSelector" class="register__typeSelector" onChange={checkSelectOption}>
                                <option selected disabled>What type of space is it?</option>
                                <option value="kitchen">kitchen</option>
                                <option value="bathroom">bathroom</option>
                                <option value="living room">living room</option>
                                <option value="coworking">coworking</option>
                                <option value="garden">garden</option>
                                <option value="rooftop">rooftop</option>
                                <option value="other">other</option>
                            </select>
                            <input type="text" name="type" class="register__otherOption" id="otherInputOption" placeholder="tell us what type of space it is"/>
                        </li>                        
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="text" name="title" placeholder="name your space!"/></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="address" name="address" placeholder="address"/></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="password" name="passcode" placeholder="passcode"/></label>
                        </li>
                        <li class="register__form-item">
                            <label><input class="register__form-input" type="password" name="repasscode" placeholder="repeat passcode"/></label>
                        </li>
                        <button class="register__form-button">Register space</button>
                    </ul>
                </form>
                <a href={`/`} class="register__back-link"><i class="fas fa-arrow-left"></i> Go back</a>
            </section>
        </main>
    </>
}