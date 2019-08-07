const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'register', credentials: undefined, error: undefined } 

        this.handleRegister = this.handleRegister.bind(this)
        this.handleGoToHome = this.handleGoToHome.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
   
    }

    handleGoToHome() {
        this.setState({ view: 'home' })
    }

    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword, error => {
                if (error) this.setState({ error: message })
                else this.setState({ view: 'login' })
            })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }
    
    handleGoToRegister() {
        this.setState({ view: 'register' })
    }

    handleLogin(email, password) {
       try {
           logic.authenticateUser(email, password)
               .then(credentials => this.setState({ view: 'home', credentials }))
               .catch(({ message }) => this.setState({ error: message }))
       } catch ({ message }) {
           this.setState({ error: message })
       }
    }


    render() {
        const { state: { view, credentials, error }, handleRegister, handleGoToLogin, handleGoToHome, handleGoToRegister, handleLogin } = this
        return  <>
          { view === 'home' && <Home/>}
          { view === "register" && <Register onBack={handleGoToHome} onLogin={handleGoToLogin} onRegister={handleRegister} error={error} />} 
          { view === "login" && <Login onBack={handleGoToHome} onRegister={handleGoToRegister} onLogin={handleLogin} error={error} />} 
        

        </>
       /*  return <>
            {view === 'landing' && <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} credentials={credentials} onLogout={handleLogout} />}
            {view === 'register' && <Register onBack={handleBackToLanding} onRegister={handleRegister} error={error} />}
            {view === 'register-success' && <RegisterSuccess onLogin={handleGoToLogin} />}
            {view === 'login' && <Login onBack={handleBackToLanding} onLogin={handleLogin} error={error} />} */
    }
}