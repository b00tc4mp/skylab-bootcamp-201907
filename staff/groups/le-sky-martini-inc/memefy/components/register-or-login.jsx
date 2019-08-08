function RegisterOrLogin({ onRegister, onLogin, onBack, error }) {
    return <section className={`register-or-login`}>
    <h1 className={`register-or-login__title`}>Log in or join to save favorites</h1>
        <ul className={`register-or-login__list`}>
            <li className={`register-or-login__item`}>
                <a className={`register-or-login__register`} href="" onClick={event => {
                    event.preventDefault()
                    onRegister()
                    }}><i class="fas fa-user-plus"></i>  Register</a>
            </li>
            <li className={`register-or-login__item`}>
                <a className={`register-or-login__login`} href="" onClick={event => {
                    event.preventDefault()
                    onLogin()
                    }}><i class="fas fa-sign-in-alt"></i>  Login</a>
            </li>
        </ul>
        {error && <Feedback message={error} />}
            <a className={`register-or-login__back`} href="" onClick={event => {
                event.preventDefault()
                onBack()     // Hacer que sea -> Go back to results. Go back genuino.
            }}><i class="fas fa-arrow-left"></i> Go Back</a>
    </section>
}