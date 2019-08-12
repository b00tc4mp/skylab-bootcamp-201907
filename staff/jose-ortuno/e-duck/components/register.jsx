function Register(props) {
    return <>
        <form onSubmit={event => {
        event.preventDefault()

        const { target:{ name: {value: name}, surname: {value: surname}, email: {value: email}, password: { value: password}}} = event

        props.onRegister(name, surname, email, password)
    }}>
        <label>
            name:
        <input type="text" name="name"/>
        </label>

        <label>
            surname:
        <input type="text" name="surname"/>
        </label>

        <label>
            email:
        <input type="email" name="email"/>
        </label>

        <label>
            password:
        <input type="password" name="password"/>
        </label>

        <button type="submit">Register</button>
    </form>
    <a href="" onClick={event => {
        event.preventDefault()

        props.onBack()
    }}>Go back</a>
    </>
}