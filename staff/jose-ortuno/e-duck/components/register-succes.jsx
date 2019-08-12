function RegisterSucces(props) {
    return <>
        <p>User successfully registered, you can now proceed to <a href="" onClick={event => {
            event.preventDefault()
            props.onLogin()
        }}>login</a></p>
    </>
}