import React from 'react'

function Login({ onLogin }) {
    return (<>
        <main className='login'>
            <h2 className='login__header'>Sign in</h2>
            <form className='login__form' onSubmit={event => {
                event.preventDefault()

                const { target: { username: { value: username }, password: { value: password } } } = event

                onLogin(username, password)
            }}>
                <label className='login__form-label'htmlFor="username">Username</label>
                <input className='login__form-input' type="username" name="username" />
                <label className='login__form-label'htmlFor="password">Password</label>
                <input className='login__form-input' type="password" name="password" />
                <button className='login__form-button'>Sign in</button>
            </form>
        </main>
    </>
    )
}

export default Login