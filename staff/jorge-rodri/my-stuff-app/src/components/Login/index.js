import React from 'react'
import { A } from 'hookrouter'
export default function () {
    return <>
        <h2>Login</h2>
        <form /* onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }} */>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Proceed</button>
        </form>
        <A href="/ ">Go back</A>     
    </>
}