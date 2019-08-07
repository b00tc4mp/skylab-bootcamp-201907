function Register({ onRegister, onBack, error }) {
    return <section className={`register`}>
        <h1>Register</h1>
        <form className={`register__form`} onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword} } } = event

            onRegister(name, surname, email, password, repassword)
        }}>
            <ul>
                <li className={`register__item`}>
                    <label>Name<input className={`register__input`} type="text" name="name" /></label>
                </li>
                <li className={`register__item`}>
                    <label>Surname<input className={`register__input`} type="text" name="surname" /></label>
                </li>
                <li className={`register__item`}>
                    <label>E-mail<input className={`register__input`} type="email" name="email" /></label>
                </li>
                <li className={`register__item`}>
                    <label>Password<input className={`register__input`} type="password" name="password" /></label>
                </li>
                <li className={`register__item`}>
                    <label>Repeat password<input className={`register__input`} type="password" name="repassword" /></label>
                </li>
                <button className={`register__button`}>Register</button>
            </ul>
        </form>
        {error && <Feedback message={error} />}
        <a className={`register__back`} href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}><i class="fas fa-arrow-left"></i> Go back</a>
    </section>
}