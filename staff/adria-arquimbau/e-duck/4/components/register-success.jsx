function RegisterSuccess({ onLogin }) {
    return <p>
        User successfully registered, you can now proceed to <a href="" onClick={event => {
            event.preventDefault()

            onLogin()
        }}>login</a>.
    </p>
}