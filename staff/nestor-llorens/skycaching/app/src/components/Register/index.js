import React from 'react'

function Register({ onRegister }) {
    return (<>
        <main className='register'>
            <h2 className='register__header'>Create account</h2>
            <form className='register__form' onSubmit={event => {
                event.preventDefault()

                const { target: { username: { value: username }, email: { value: email }, password: { value: password } } } = event

                onRegister(username, password, email)
            }}>

                <label className='register__form-label'htmlFor="username">Username</label>
                <input className='register__form-input'type="text" name="username" />
                <label className='register__form-label'htmlFor='password'>Password</label>
                <input className='register__form-input'type="password" name="password" />
                <label className='register__form-label'htmlFor="email">Email</label>
                <input className='register__form-input'type="email" name="email" />
                <button className='register__form-button'>Create account</button>
            </form>
        </main>
    </>
    )
}

export default Register