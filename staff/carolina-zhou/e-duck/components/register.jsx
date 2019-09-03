function Register(props) {
    return <form onRegister={event => {
        event.preventDefault()

        const {
            name: {value: name},
            surname: {value: surname},
            email: { value: email},
            password: {value: password}
        
        } = event

        props.onRegister(name, surname, email, password)
    }}>
        <input type="text" name="name" />
        <input type="text" name="surname" />
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button>Submit</button>
    </form>
}