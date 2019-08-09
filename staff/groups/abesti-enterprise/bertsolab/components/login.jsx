/**
* Login component .
*/

function Login({ onLogin, onBack, onRegister, error }) {
    return <>
    <section className="login">
        <h2 className="login__title">Login</h2>
        <form className="form login__form" onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <label>E-mail<input className="login__form--field form__field" type="email" name="email" /></label>
            <label>Password<input className="login__form--field form__field" type="password" name="password" /></label>
            <button className="login__button form__button">Login</button>
        </form>
        {error && <Feedback message={error} />}

        <p className="login__info form__info">Don't you have an account? Go to <span></span>
        <a className="login__on-register anchor__link" href="" onClick={event => {
        event.preventDefault()

            onRegister()
        }}>Register</a></p>
    
        <a className="login__back-button anchor__link" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </section>
    </>
}