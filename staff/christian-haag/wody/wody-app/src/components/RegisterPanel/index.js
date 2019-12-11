import React, { useState } from 'react'
import logic from '../../logic'
import './index.sass'
import { Route, withRouter } from 'react-router-dom'
import Registersuccess from '../RegistersuccessPanel'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history, onBack }) {
    const [errorMessage, setErrorMessage] = useState()

    const handleGoToLogin = event => {
        event.preventDefault()
        history.push('/login')
    }

    const handleRegister = async (name, surname, email, password) => {

        try {
            await logic.registerUser(name, surname, email, password)
            history.push('/registersuccess')

        } catch ({ message }) {
            setErrorMessage(message)
        }
    }

    return <div className="register-container">
        <Route path='/registersucess' render={() => <Registersuccess />} />
        <div className="register-header">
            <div className="header logo"></div>
            <p className="header text">You are only one step away to become a better version of yourself. </p>
        </div>
        <p className="p-header">Create an account</p>
        <form className="form" onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

            handleRegister(name, surname, email, password)

        }}>
            <label className="label-placeholder" htmlFor="name">Name</label>
            <input className="input-field" type="text" name="name" id="name" />
            <label className="label-placeholder" htmlFor="surname">Surname</label>
            <input className="input-field" type="text" name="surname" id="surname" />
            <label className="label-placeholder" htmlFor="email">E-mail</label>
            <input className="input-field" type="email" name="email" id="email" />
            <label className="label-placeholder" htmlFor="password">Password</label>
            <input className="input-field" type="password" name="password" id="password" />
            {errorMessage && <p className="login-error">{errorMessage}</p>}
            <button className="bttn">Sign up</button>
        </form>

        <p className="p-login">Do you have an account?<a className="a-login" onClick={handleGoToLogin}> sign in here</a></p>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} onClick={event => {
            event.preventDefault()
            onBack()
        }} />
    </div>

})