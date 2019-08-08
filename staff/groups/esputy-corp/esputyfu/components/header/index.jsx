function Header(props) {
        return <>
            <header className='header'>
                <img className='header__logo' src="components/header/logo.png" alt=""/>
                <h2>Esputyfú</h2>
                {!props.state ? 
                    <nav className='header__nav'>
                        <ul className='header__ul'>
                            <li className='header__li'>
                                <a className='header__a' href="" onClick={event => {
                                    event.preventDefault()
                                    props.onLogin()
                                }}>Iniciar sesión</a>
                            </li>
                            <li>
                                <a className='header__a' href="" onClick={event => {
                                    event.preventDefault()
                                    props.onRegister()
                                }}>Registro</a>
                            </li>
                        </ul>
                    </nav>
                    :
                     <nav>
                     <ul>
                         <li>
                             <a className='header__a' href="" onClick={event => {
                                 event.preventDefault()
                                 props.onFavorites()
                             }}>Favoritos</a>
                         </li>
                     </ul>
                 </nav>}
            </header>
        </>
    }