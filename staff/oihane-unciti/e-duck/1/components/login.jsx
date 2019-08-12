function Login(props) {
    return <>
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { email: { value: email },  password: { value: password }} } = event

        props.onLogin(email, password)
    }}>
        <h1>Login</h1>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button>Login</button>
        <p>Do not have an account? <a href="">Register</a> here</p>
    </form>
         <a href="" onClick={event =>{
              event.preventDefault()
              onBack()
        }}>Go back</a>
    </>   
}
