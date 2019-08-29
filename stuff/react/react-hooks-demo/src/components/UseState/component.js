import React, { Component } from 'react';

class Login extends Component {

    state = { email: null, password: null }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password } } = this

        alert(`Email: ${email}, Password:${password}`)
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit } = this
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
                    <button class="button is-primary is-outlined">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;
