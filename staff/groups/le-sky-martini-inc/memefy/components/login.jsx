function Login({ onLogin, onBack, error }) {
    return <>
        <h1>Login</h1>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <button>Login</button>
        </form>
        {error && <Feedback message={error} />}
        <a href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}