function Login(props) {
    return <>
    <h1>Para continuar, inicia sesión en Esputifú.</h1>
    <form onSubmit={event => {
        event.preventDefault()

        const { target:
            { email:
                { value: email },
            password:
                { value: password }
            }
        } = event

        props.onLogin(email, password)
    }} >
        <label >
            <p>email</p>
            <input type="email" name="email" placeholder="email"/>
        </label>
        <label >
            <p>contraseña</p>
            <input type="password" name="password" placeholder="contraseña" />
        </label>
        <button>Entra</button>
    </form >
</>
}