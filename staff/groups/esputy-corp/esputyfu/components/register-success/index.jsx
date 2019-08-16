function RegisterSuccess(props) {
    return <p className='container success'>
        Gracias por registrarse, puede proceder a<a className='container__a success__a' href="" onClick={event => {
            event.preventDefault()
            props.onLogin()
        }}>Iniciar Sesión</a>.
    </p>
}