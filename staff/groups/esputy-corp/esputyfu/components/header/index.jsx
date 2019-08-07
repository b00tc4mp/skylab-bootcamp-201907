function Header(props) {
    return <>
        <header>
                <nav>
                    <ul>
                        <li><a href="#" >Favoritos</a></li>
                        <li><a href="" onClick={event => {
                           event.preventDefault()
                           props.onLogin()}
                        }>Iniciar sesión</a></li>
                        <li><a href="" onClick={event => {
                           event.preventDefault()
                           props.onRegister()
                        }}>Registro</a></li>
                    </ul>
                </nav>
            </header>
        </>
}