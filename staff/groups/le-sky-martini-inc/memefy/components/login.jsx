function Login({ onLogin, onBack, error }) {
    return <section className={`login`}>
        <h1>Login</h1>
        <form className={`login__form`} onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <ul>
                <li className={`login__item`}>
                   <label for="email">E-mail</label>
                   <input className={`login__input`} type="email" name="email" id="email"/>
                </li>
                <li className={`login__item`}>
                    <label for="password">Password</label>
                    <input className={`login__input`} type="password" name="password" id="password"/>
                </li>
            </ul>
            <button className={`login__button`}>Login</button>
        </form>
        {error && <Feedback message={error} />}
        <a className={`login__back`} href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}><i class="fas fa-arrow-left"></i> Go back</a>
    </section>
}