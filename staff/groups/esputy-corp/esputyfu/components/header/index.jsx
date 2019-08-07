class Header extends React.Component {
    constructor() {
        super()

    }

    render() {
        return <>

            <header>
                {!this.props._state ? 
                    <nav>
                        <ul>
                            <li>
                                <a href="" onClick={event => {
                                    event.preventDefault()
                                    this.props.onLogin()
                                }}>Iniciar sesión</a>
                            </li>
                            <li>
                                <a href="" onClick={event => {
                                    event.preventDefault()
                                    this.props.onRegister()
                                }}>Registro</a>
                            </li>
                        </ul>
                    </nav>
                    :
                     <nav>
                     <ul>
                         <li>
                             <a href="#">Favoritos</a>
                         </li>
                     </ul>
                 </nav>}
            </header>
        </>
    }
}