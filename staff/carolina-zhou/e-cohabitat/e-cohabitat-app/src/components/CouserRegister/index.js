import React, { useState } from 'react'
import logic from '../../logic/'
import Feedback from '../Feedback'
import { withRouter } from 'react-router-dom'


function CouserRegister({ history, match }) {
    const  [error, setError]  = useState()

    const { params: { spaceId } } = match
    
    function handleSubmit(event) {
        event.preventDefault()

        const { target: { email: { value: email }, passcode: { value: passcode }} } = event

        handleRegister(email, passcode)
    }

    async function handleRegister(email, passcode) {

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId)

            history.push(`/spaces/${spaceId}`)
        } catch({ message }) {
            setError(message)
        }
    }

    function handleBack(event) {
        event.preventDefault()

        history.push(`/spaces/${spaceId}`)
    }

    return <>

            <section className="couserRegister">
                <h1 className="couserRegister__title">Find your co-habitat companions!</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>                     
                        <li className="couserRegister__form-item">
                            <label htmlFor="couserEmailInput"><input className="couserRegister__form-input" id="couserEmailInput" type="text" name="email" placeholder="find by email address"/></label>
                        </li>
                        <li className="couserRegister__form-item">
                            <label htmlFor="spacePasscodeInput"><input className="couserRegister__form-input" id="spacePasscodeInput" type="password" name="passcode" placeholder="enter space passcode"/></label>
                        </li>
                        {error &&
                        <li className="couserRegister__form-item">
                            <Feedback message={error}/>
                        </li> }
                        <li className="couserRegister__form-item">
                            <button className="couserRegister__form-button">Add user</button>
                        </li>
                    </ul>
                </form>
                <a href="#" className="couserRegister__back-link" onClick={handleBack}><i className="fas fa-arrow-left" ></i> Go back</a>
            </section>

    </>
}

export default withRouter(CouserRegister)