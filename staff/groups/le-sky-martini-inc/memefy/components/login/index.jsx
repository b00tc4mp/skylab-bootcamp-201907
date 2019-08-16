 /**
 * Authenticate user form.
 */

function Login({ onLogin, onBack, error }) {
    return <section className={`login`}>
        <h1 className={`login__title`}>Sign in</h1>
        <form className={`login__form`} onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <ul>
                <li className={`login__item`}>
                   <label for="email"></label>
                   <input className={`login__input`} type="email" name="email" id="email"  placeholder="email"/>
                </li>
                <li className={`login__item`}>
                    <label for="password"></label>
                    <input className={`login__input`} type="password" name="password" id="password" placeholder="password"/>
                </li>
            </ul>
            {error && <Feedback message={error} />}
            <button className={`login__button`}>done</button>
        </form>
        
        <a className={`login__back`} href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}><i class="fas fa-arrow-left"></i> Go back</a>
    </section>
}