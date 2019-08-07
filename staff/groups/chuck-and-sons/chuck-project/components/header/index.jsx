function Header(props){
    
    const {
        onGoToRegister,
        onGoToLogin, 
        onChangeView,
        user
    } = props    
    
    return <>
        <header className="header">
            <h1> Chuck Generator </h1>
            <nav className = "navigation">
                <ul>
                { onChangeView !== 'register' && <li><a href="" className = "btn btn__register" onClick={ event => {
                                                        event.preventDefault()
                                                        onGoToRegister()
                                                    }}>Register</a></li>
                                                }
                
                { onChangeView !== 'login' && <li><a href="" className = "btn btn__login" onClick={ event => {
                                                    event.preventDefault()
                                                    onGoToLogin()
                                                }}>Login</a></li>
                                            }
                { user && <li><a href="" className = "btn btn__logout" onClick={ event => {
                                                    event.preventDefault()
                                                    onGoToLogout()
                                                }}>Logout</a></li>
                                            }
                </ul>
            </nav>
        </header>
    </>
}