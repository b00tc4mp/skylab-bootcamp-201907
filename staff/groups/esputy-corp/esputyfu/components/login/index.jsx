function Login(props) {
    return <>
    <div className=' full login'>
        <h1 >Inicia sesión</h1>
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
                <p className = 'container__campName'>email</p>
                <input className='container__input' type="email" name="email" placeholder="email"/>
            </label>
            <label >
                <p className = 'container__campName'>contraseña</p>
                <input className='container__input' type="password" name="password" placeholder="contraseña" />
            </label>
            <button className='container__button'>Entra</button>
        </form >
    </div>
</>
}