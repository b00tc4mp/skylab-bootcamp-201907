import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Feedback } from '../../components'

export default function ({ onRegister, error }) {

    return <>
        <section className="body-form">
            <Link className="back" to="/sign"><i className="fas fa-arrow-left"></i></Link>

            <form className="form-section" onSubmit={event => {
                event.preventDefault()

                const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

                onRegister(name, surname, email, password)

            }}>
                <h1 className="sign-logo">REGISTER</h1>
                <input type="text" name="name" placeholder="name" />
                <input type="text" name="surname" placeholder="surname" />
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="password" name="repassword" placeholder="repeat password" />

                <button className="button__sign button">SUBMIT</button>
            </form>
            {error && <Feedback message={error} />}
        </section>
    </>
}