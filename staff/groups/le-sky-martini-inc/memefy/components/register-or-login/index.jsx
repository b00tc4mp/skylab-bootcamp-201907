 /**
 * Register or login selector to authenticate or add users.
 */

function RegisterOrLogin({ onRegister, onLogin, onBack, error }) {
    return <section className={`register-or-login`}>
    <h1 className={`register-or-login__title`}>Sign in or join us!</h1>
        <ul className={`register-or-login__list`}>
            <li className={`register-or-login__item`}>
                <a className={`register-or-login__link`} href="" onClick={event => {
                    event.preventDefault()
                    onRegister()
                    }}><i class="fas fa-user-plus"></i>  Sign up</a>
            </li>
            <li className={`register-or-login__item`}>
                <a className={`register-or-login__link`} href="" onClick={event => {
                    event.preventDefault()
                    onLogin()
                    }}><i class="fas fa-sign-in-alt"></i>  Sign in</a>
            </li>
        </ul>
        {error && <Feedback message={error} />}
            <a className={`register-or-login__back`} href="" onClick={event => {
                event.preventDefault()
                onBack()     // Hacer que sea -> Go back to results. Go back genuino.
            }}><i class="fas fa-arrow-left"></i> Go Back</a>
    </section>
}