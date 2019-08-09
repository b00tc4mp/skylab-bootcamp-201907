function Login({ onLogin, onBack, onRegister, error }) {
    return <>
    <section className="login">
        <h2 className="login__title">Login</h2>
        <form className="login__form form" onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <label>E-mail<input className="login__form--field form__field" type="email" name="email" /></label>
            <label>Password<input className="login__form--field form__field" type="password" name="password" /></label>
            <button className="login__button form_button">Login</button>
        </form>
        {error && <Feedback message={error} />}

        <p className="login__info form-info">Don't you have an account? Go to
        <a className="login__on-register" href="" onClick={event => {
        event.preventDefault()

            onRegister()
        }}> Register</a></p>
    
        <a className="login__back-button back-link" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </section>
    </>
}