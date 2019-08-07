function Register(props) {
    return <>
        <div class='full'>
            <div className='container'>
                <h1>Regístrate!</h1>
                <form onSubmit={event => {
                    event.preventDefault()

                    const name = event.target.name.value
                    const surname = event.target.surname.value
                    const email = event.target.email.value
                    const password = event.target.password.value
                    const repassword = event.target.repassword.value

                    props.onRegister(name, surname, email, password, repassword)
                }}>

                    <label><p class = 'container__campName'>Nombre</p><input type="text" class='container__input' name="name" placeholder='Nombre' /></label>
                    <label><p class = 'container__campName'>Apellido</p><input type="text" class='container__input' name="surname" placeholder='Apellido'/></label>
                    <label><p class = 'container__campName'>Correo Electrónico</p><input type="email" class='container__input' name="email" placeholder='Correo Electrónico'/></label>
                    <label><p class = 'container__campName'>Contraseña</p><input type="password" class='container__input' name="password" placeholder='Contraseña' /></label>
                    <label><p class = 'container__campName'>Confirma la contraseña</p><input type="password" class='container__input' name="repassword" placeholder='Confirma la Contraseña'/></label>
                    <p class='container__advice'>Al hacer clic en Registrarse, aceptas los Términos y Condiciones de Uso de Esputifú.
                    Los cuales incluyen regalarnos su casa y coche. Para cualquier duda pongáse en contacto con "Manu" de Skylab. 
                    </p>
                    <button class ='container__button'>Registrarse</button>
                </form>
            </div>
        </div>
        {/* <a href="" onClick={event => {
            event.preventDefault()
            props.onBack()
        }}>Volver</a> */}
    </>
}