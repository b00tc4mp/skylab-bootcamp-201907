function Header(props){
    
    const {
        onGoToRegister,
        onGoToLogin,
        onLogout,
        onChangeView,
        user
    } = props    
    
    return <>
        <header className="header">
            <h1> Chuck Generator </h1>
            {user && <p>Welcome {user.name} {user.surname}</p>}
            <nav className = "navigation">
                <ul>
                { onChangeView !== 'register' && !user && <li><a href="" className = "btn btn__register" onClick={ event => {
                                                        event.preventDefault()
                                                        onGoToRegister()
                                                    }}>Register</a></li>
                                                }
                
                { onChangeView !== 'login' && !user && <li><a href="" className = "btn btn__login" onClick={ event => {
                                                    event.preventDefault()
                                                    onGoToLogin()
                                                }}>Login</a></li>
                                            }
                { user && <li><a href="" className = "btn btn__logout" onClick={ event => {
                                                    event.preventDefault()
                                                    onLogout()
                                                }}>Logout</a></li>
                                            }
                </ul>
            </nav>
        </header>
    </>
}