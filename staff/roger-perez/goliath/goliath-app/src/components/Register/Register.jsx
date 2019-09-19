import React from 'react'
import Feedback from '../Feedback'


function Register({ onRegister, onBack, error }) {
    return <>
        <div className="register">

        <h1>Register</h1>
        <form className='registerForm' onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname },  instrument: { value: instrument },description: { value: description }, email: { value: email }, password: { value: password }, repassword: { value: repassword} } } = event

            onRegister(name, surname,instrument, description, email, password, repassword)
        }}>
            {error && <Feedback message={error} />}
            <label className="label">Name</label>
            <input type="text" name="name" />
            <label className="label">Surname</label>
            <input type="text" name="surname" />
            <label className="label">Instrument</label>
            <input type="text" name="instrument" />
            <label className="label">Description</label>
            <input type="textarea" name="description" />
            <label className="label">E-mail</label>
            <input type="email" name="email" />
            <label className="label">Password</label>
            <input type="password" name="password" />
            <label className="label">Repeat password</label>
            <input type="password" name="repassword" />
            <br/>
            <button>Register</button>
        </form>
        
        <a className="goback" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
        </div>
    </>
}
export default Register