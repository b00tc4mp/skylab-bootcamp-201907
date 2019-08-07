function RegisterSuccess({ onLogin }) {
    return <section className={`register-success`}>
        <p>
        User successfully registered, you can now proceed to <a className={`register-success__login`} href="" onClick={event => {
            event.preventDefault()

            onLogin()
        }}>login</a>.
    </p>
    </section>
}