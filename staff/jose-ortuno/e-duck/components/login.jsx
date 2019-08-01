function Login(props) {
    return <>
        <form onSubmit={event => {
            event.preventDefault()

            const { target:{ email: {value: email}, password: { value: password}}} = event

            props.onLogin(email, password)
        }}>
            <label>
                email:
            <input type="email" name="email"/>
            </label>

            <label>
                password:
            <input type="password" name="password"/>
            </label>
            <button type="submit">Login</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()

            props.onBack()
        }}>Go back</a>
    </>
}