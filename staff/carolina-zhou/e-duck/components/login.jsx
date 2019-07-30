function Login(props) {
    return <form onLogin={event => {
        event.preventDefault()

        const {
            email: { value: email},
            password: {value: password}
        
        } = event

        props.onLogin(email, password)
    }}>
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button>Submit</button>
    </form>
}