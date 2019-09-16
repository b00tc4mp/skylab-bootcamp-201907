import React, { useState } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

function SpaceRegister({ history }) {

    const { id } = logic.__userCredentials__
    const [type, setType] = useState("")

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
        if (type === 'other')  picture = 'https://res.cloudinary.com/czhoulin/image/upload/v1568190110/images/other-3_sbctr2.jpg'

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

            <section className="register">
                <h1 className="register__title">Add a space to cohabit!</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li className="register__form-item">
                            <select name="type" form="space type" id="typeSelector" className="register__typeSelector" onChange={e => {
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
                            {type === 'other' && <input type="text" name="type" className="register__otherOption" id="otherInputOption" placeholder="tell us what type of space it is"/>}
                        </li>                        
                        <li className="register__form-item">
                            <label htmlFor="titleInput"><input className="register__form-input" id="titleInput" type="text" name="title" placeholder="name your space!"/></label>
                        </li>
                        <li className="register__form-item">
                            <label htmlFor="addressInput"><input className="register__form-input" id="addressInput" type="address" name="address" placeholder="address"/></label>
                        </li>
                        <li className="register__form-item">
                            <label htmlFor="passcodeInput"><input className="register__form-input" id="passcodeInput" type="password" name="passcode" placeholder="passcode"/></label>
                        </li>
                        <li className="register__form-item">
                            <label htmlFor="repasscodeInput"><input className="register__form-input" id="repasscodeInput" type="password" name="repasscode" placeholder="repeat passcode"/></label>
                        </li>
                        <button className="register__form-button">Register space</button>
                    </ul>
                </form>
                <a href="#" className="register__back-link"><i className="fas fa-arrow-left" onClick={() => { history.push('/home') }}></i> Go back</a>
            </section>

    </>
}

export default withRouter(SpaceRegister)