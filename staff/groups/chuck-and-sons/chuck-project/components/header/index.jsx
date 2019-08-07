function Header(props){
    
    const {
        onGoToRegister,
        onGoToLogin, 
        onChangeView
    } = props    
    
    return <>
        <header className="header">
            <h1> Chuck Generator </h1>
            <nav className = "navigation">
                { onChangeView !== 'register' && <a href="" className = "btn btn__register" onClick={ event => {
                                                        event.preventDefault()
                                                        onGoToRegister()
                                                    }}>Register</a>
                                                }
                
                { onChangeView !== 'login' && <a href="" className = "btn btn__login" onClick={ event => {
                                                    event.preventDefault()
                                                    onGoToLogin()
                                                }}>Login</a>  
                                            }
            </nav>
        </header>
    </>
}