import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'

export default withRouter(function ({ onLogin, history }) {


    { logic.isUserLoggedIn() && history.push('/profile') }
    return <section className="body-form">
        <Link className="back" to="/"><i className="fas fa-arrow-left"></i></Link>


        <form className="form-section" onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <h1 className="sign-logo">LOGIN</h1>
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button className="button__sign button">PROCEED</button>
            <p className="signup">don't have an account? <Link to="/register">Sign-up!</Link></p>
        </form>



    </section>
})