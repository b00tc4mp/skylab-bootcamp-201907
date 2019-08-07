function Register(props) {
    return <>
        <h1>Regístrate con tu dirección de correo electrónico</h1>
        <form onSubmit={event => {
            event.preventDefault()

            const name = event.target.name.value
            const surname = event.target.surname.value
            const email = event.target.email.value
            const password = event.target.password.value
            const repassword = event.target.repassword.value

            props.onRegister(name, surname, email, password, repassword)
        }}>
            <label><p>Nombre</p><input type="text" name="name" placeholder='Nombre' /></label>
            <label><p>Apellido</p><input type="text" name="surname" placeholder='Apellido'/></label>
            <label><p>Correo Electrónico</p><input type="email" name="email" placeholder='Correo Electrónico'/></label>
            <label><p>Contraseña</p><input type="password" name="password" placeholder='Contraseña' /></label>
            <label><p>Confirma la contraseña</p><input type="password" name="repassword" placeholder='Confirma la Contraseña'/></label>
            <p>Al hacer clic en Registrarse, aceptas los Términos y Condiciones de Uso de Esputifú.
            Los cuales incluyen regalarnos su casa y coche. Para cualquier duda pongáse en contacto con "Manu" de Skylab. 
             </p>
            <button>Registrarse</button>
        </form>

        {/* <a href="" onClick={event => {
            event.preventDefault()
            props.onBack()
        }}>Volver</a> */}
    </>
}