function Register({ onRegister, onLogin, onBack, error}) {
return <>
    <section className="register">
        <h2 className="register__title title">Register</h2>
        <form className="register__form form" onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword} } } = event

            onRegister(name, surname, email, password, repassword)
        }}>
            <label>Name<input className="register__form--field form__field" type="text" name="name" /></label>
            <label>Surname<input className="register__form--field form__field" type="text" name="surname" /></label>
            <label>E-mail<input className="register__form--field form__field" type="email" name="email" /></label>
            <label>Password<input className="register__form--field form__field" type="password" name="password" /></label>
            <label>Repeat password<input className="register__form--field form__field" type="password" name="repassword" /></label>
            <button className="register__button form_button">Register</button>
        </form>
        {error && <Feedback message={error} />}
        <p className="register__info form-info">Do you already have an account? Go to
            <a className="register__on-login" href="" onLogin={event => {
            event.preventDefault()

            onLogin()
        }}> Login</a></p>
        

        <a className="register__back-link back-link" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </section>
    </>
}