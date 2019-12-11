import React, { useState } from 'react'
import logic from '../../logic'
import './index.sass'
import Gender from '../GenderPanel'
import Home from '../Home'
import { Route, withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history, onBack }) {

    const [errorMessage, setErrorMessage] = useState()

    const handleLogin = async (email, password) => {
        try {
            await logic.authenticateUser(email, password)
            let user = await logic.retrieveUser()
            if (user.height > 0) {

                history.push('/home')
            } else if (user.height === 0) {

                history.push('/gender')
            }

        } catch ({ message }) {
            setErrorMessage(message)
        }
    }

    const handleGoToRegister = event => {
        event.preventDefault()
        history.push('/register')
    }

    return <>
        <Route path="/gender" render={() => <Gender />} />
        <Route path="/home" render={() => <Home />} />
        <div className="login-container">
            <div className="login-header ">
                <h2 className="login-header--h2">Wellcome back</h2>
                <p className="login-header--text">sign into your account</p>
            </div>

            <div className="login-form">
                <form onSubmit={event => {
                    event.preventDefault()

                    const { target: { email: { value: email }, password: { value: password } } } = event

                    handleLogin(email, password)
                }}>
                    <label className="login-placeholder" htmlFor="email">Email</label>
                    <input className="login-input" type="email" name="email" />
                    <label className="login-placeholder" htmlFor="password">Password</label>
                    <input className="login-input" type="password" name="password" />
                    {errorMessage && <p className="login-error">{errorMessage}</p>}
                    <button className="login-panel-bttn">Sign in</button>
                </form>
            </div>

            <p className="toregister-text">Do you still not have an account? <a className="toregister-link" href="#" onClick={handleGoToRegister}>Sign up for free</a></p>
            <div className="login-text">
                <p className="login-text-p">The only bad workout is the one that didn't happen</p>
            </div>
            <FontAwesomeIcon className="icon-login" icon={faArrowLeft} onClick={event => {
                event.preventDefault()
                onBack()
            }} />
        </div>

    </>
})