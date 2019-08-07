function RegisterOrLogin({ onRegister, onLogin, onBack, error }) {
    return <section className={`register-or-login`}>
    <h1>Register or Login</h1>
        <ul>
            <li className={`register-or-login__item`}>
                <a className={`register-or-login__register`} href="" onClick={event => {
                    event.preventDefault()
                    onRegister()
                    }}>Register</a>
            </li>
            <li className={`register-or-login__item`}>
                <a className={`register-or-login__login`} href="" onClick={event => {
                    event.preventDefault()
                    onLogin()
                    }}>Login</a>
            </li>
        </ul>
        {error && <Feedback message={error} />}
            <a className={`register-or-login__back`} href="" onClick={event => {
                event.preventDefault()
                onBack()     // Hacer que sea -> Go back to results. Go back genuino.
            }}>Back to Home</a>
    </section>
}