function Header(props) {
    return <>
        <header className='header'>
            <h2 className='header__h2'>Esputyfú</h2>
            {!props.state ?
                <nav className='header__nav'>
                    <ul className='header__ul'>
                        <li className='header__li'>
                            <a className='header__a' href="" onClick={event => {
                                event.preventDefault()
                                props.onLogin()
                            }}>Login</a>
                        </li>
                        <li className='header__li'>
                            <a className='header__a' href="" onClick={event => {
                                event.preventDefault()
                                props.onRegister()
                            }}>Register</a>
                        </li>
                    </ul>
                </nav>
                :
                <nav className='header__nav'>
                    <ul className='header__ul'>
                        {props.nav === 'favorites' ? <li className='header__li'>
                            <a className='header__a' href="" onClick={event => {
                                event.preventDefault()
                                props.onSearch()
                            }}>Buscar</a>
                        </li> : <li className='header__li'>
                            <a className='header__a' href="" onClick={event => {
                                event.preventDefault()
                                props.onFavorites()
                            }}>Favoritos</a>
                        </li>}
                        <li className='header__li'>
                            <a className='header__a' href="" onClick={event => {
                                event.preventDefault()
                                { props.onLogout() }
                            }}>Salir</a>
                        </li>
                    </ul>
                </nav>}
        </header>
    </>
}

