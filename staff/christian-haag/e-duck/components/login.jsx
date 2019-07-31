function Login({ onLogin, onBack }) {
    return <>
        <h2>Login</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event
            onLogin(email, password)
        }}>

            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Login</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()
            onBack()
        }}>Go back</a>
    </>
}

