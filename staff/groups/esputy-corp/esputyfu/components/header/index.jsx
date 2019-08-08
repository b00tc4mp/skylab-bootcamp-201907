class Header extends React.Component {
    constructor() {
        super()

    }

    render() {
        return <>

            <header class='header'>
                <h2>Esputyfú</h2>
                {!this.props._state ? 
                    <nav class='header__nav'>
                        <ul class='header__ul'>
                            <li class='header__li'>
                                <a class='header__a' href="" onClick={event => {
                                    event.preventDefault()
                                    this.props.onLogin()
                                }}>Iniciar sesión</a>
                            </li>
                            <li>
                                <a class='header__a' href="" onClick={event => {
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
                             <a class='header__a' href="#">Favoritos</a>
                         </li>
                     </ul>
                 </nav>}
            </header>
        </>
    }
}