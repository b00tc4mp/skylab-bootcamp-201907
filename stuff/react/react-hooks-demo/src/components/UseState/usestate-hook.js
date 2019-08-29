import React, { useState } from 'react';

function Login() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleEmailInput = event => setEmail(event.target.value)

    const handlePasswordInput = event => setPassword(event.target.value)
    const handleFormSubmit = event => {
        event.preventDefault()
        alert(`Email: ${email}, Password:${password}`)

    }

    return (
        <div className="useState" >
            <form onSubmit={handleFormSubmit}>
                <input
                    class="input is-info"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailInput}
                    required
                />
                <input
                    class="input is-info"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordInput}
                    required
                />
                <button class="button is-fullwidth is-info is-outlined">Submit</button>
            </form>
        </div>
    )
}

export default Login;
