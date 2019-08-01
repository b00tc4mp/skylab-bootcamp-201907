function Login({ onLogin, onBack }) {
    return <>
        <h1>Login</h1>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <label htmlFor="">Name</label>
            <input type="email" name="email" />
            <label htmlFor="">Password</label>
            <input type="password" name="password" />
            <button>Login</button>
            <a href="" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</a>
        </form>
    </>
}