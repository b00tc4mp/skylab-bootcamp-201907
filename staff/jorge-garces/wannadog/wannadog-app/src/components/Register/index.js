import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ onRegister }) {
    return <>
        <Link to="/sign">Back</Link>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

            onRegister(name, surname, email, password)

        }}>
            <input type="text" name="name" />
            <input type="text" name="surname" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>SUBMIT</button>
        </form>
    </>
}