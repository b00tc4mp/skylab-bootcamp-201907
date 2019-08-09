function Header(props) {

    const {
        onGoToRegister,
        onGoToLogin,
        onLogout,
        onChangeView,
        user,
        credentials
    } = props
    console.log(user, credentials)
    return <>
        <header className="header">
            <img className="header--image" src="../resources/chuck.png" />

            <nav className="navigation">
                <ul>
                    {!credentials && onChangeView === 'landing' && <li className="btn btn__nav--reg" onClick={event => {
                        event.preventDefault()
                        onGoToRegister()
                    }}>Register</li>
                    }

                    {!credentials && onChangeView === 'landing' && <li className="btn btn__nav--log" onClick={event => {
                        event.preventDefault()
                        onGoToLogin()
                    }}>Login</li>
                    }
                    {credentials && user && <>
                        <p className="welcome">Welcome {user.name}</p>
                        <li className="btn btn__logout" onClick={event => {
                            event.preventDefault()
                            onLogout()
                        }}>Logout</li>
                    </>}
                </ul>
            </nav>
        </header>
    </>
}