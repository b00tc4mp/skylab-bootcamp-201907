function RegisterSuccess(props) {
    return <p>
        Gracias por registrarse, puede proceder a <a href="" onClick={event => {
            event.preventDefault()
            props.onLogin()
        }}>Iniciar Sesión</a>.
    </p>
}