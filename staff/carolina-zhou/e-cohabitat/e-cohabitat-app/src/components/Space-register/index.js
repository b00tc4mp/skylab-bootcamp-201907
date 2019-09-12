import React, { useContext, useState } from 'react'
import logic from '../../logic'
import Context from '../context'
import { withRouter } from 'react-router-dom'

function SpaceRegister({ history }) {

    const { credentials } = useContext(Context)
    const [type,setType] = useState("")
    const id = credentials.id

    function handleSubmit(event) {
            event.preventDefault()
            let picture
            const { target: { title: { value: title }, address: { value: address }, passcode: { value: passcode }} } = event

            if (type === 'kitchen') picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190112/images/kitchen-1_unqzwo.jpg'
            if (type === 'bathroom')  picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190108/images/bathroom-1_gorccu.jpg'
            if (type === 'living room')  picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190109/images/living-1_bmvmtp.jpg'
            if (type === 'coworking')  picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190117/images/coworking-1_g8egym.jpg'
            if (type === 'garden')  picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190108/images/garden-1_pe9pqt.jpg'
            if (type === 'rooftop')  picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190111/images/rooftop-1_oehaoy.jpg'
            if (type === 'other')  { picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190110/images/other-3_sbctr2.jpg'
                const { target: { type: { value: type }} } = event
                //TODO CUSTOM TYPE
                /* handleRegister(title, type, picture, address, passcode, id)
                return {} */}

            handleRegister(title, type, picture, address, passcode, id)

    }

    async function handleRegister(title, type, picture, address, passcode, id) {
        try {
            
            await logic.registerSpace(title, type, picture, address, passcode, id)

            history.push('/home')
        } catch(error) {
            console.log(error.message)
        }

    }

    
    return <>
        <main class="main"> 
            <section class="register">
                <h1 class="register__title">Add a space to cohabit!</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li class="register__form-item">
                            <select name="type" form="space type" id="typeSelector" class="register__typeSelector" onChange={e => {
                                setType(e.target.value)
                            }}>
                                <option selected disabled>What type of space is it?</option>
                                <option value="kitchen">kitchen</option>
                                <option value="bathroom">bathroom</option>
                                <option value="living room">living room</option>
                                <option value="coworking">coworking</option>
                                <option value="garden">garden</option>
                                <option value="rooftop">rooftop</option>
                                <option value="other">other</option>
                            </select>
                            {type === 'other' && <input type="text" name="type" class="register__otherOption" id="otherInputOption" placeholder="tell us what type of space it is"/>}
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
                <a href='#' class="register__back-link"><i class="fas fa-arrow-left" onClick={() => {
                    history.push('/')
                }}></i> Go back</a>
            </section>
        </main>
    </>
}

export default withRouter(SpaceRegister)