const { Component } = React

/**
 * The main application container.
 */

class App extends Component {
    constructor() {
        super()

        let credentials

        const { id, token } = sessionStorage

        id && token && (credentials = { id, token })

        this.state = { view: 'landing', credentials, error: undefined } // view: 'register', 'login', ...

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleGoToRegisterOrLogin = this.handleGoToRegisterOrLogin.bind(this)
    }


    handleGoToRegisterOrLogin() {
         this.setState({ view: 'registerorlogin' })
     }
 
    handleGoToRegister() {
        this.setState({ view: 'register' , error:undefined })
    }

    handleBackToLanding() {
        this.setState({ view: 'landing' })
    }

    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => this.setState({ view: 'register-success' }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToLogin() {
        this.setState({ view: 'login', error: undefined })
    }

    handleLogin(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(credentials => {
                    sessionStorage.id = credentials.id
                    sessionStorage.token = credentials.token

                    this.setState({ view: 'landing', credentials })
                })
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogout() {
        delete sessionStorage.id
        delete sessionStorage.token

        this.setState({ credentials: undefined })
    }

    render() {
        const { state: { view, credentials, error }, handleGoToRegister, handleRegister, handleBackToLanding, handleGoToLogin, handleLogin, handleLogout, handleGoToRegisterOrLogin } = this

        return <body className={`body`}>
            <header className={`body__header`}>
                <p><a className={`body__header-title1`} href=""><i className="fas fa-tv"></i> Memefy <span className={`body__header-title2`}>.TV</span></a></p>
            </header>
            <main className={`body__main`}>
                {view === 'landing' && <Landing onRegister={handleGoToRegister} onRegisterOrLogin={handleGoToRegisterOrLogin} onLogin={handleGoToLogin} credentials={credentials} onLogout={handleLogout} />}
                {view === 'register' && <Register onBack={handleBackToLanding} onRegister={handleRegister} error={error} />}
                {view === 'register-success' && <RegisterSuccess onLogin={handleGoToLogin} />}
                {view === 'registerorlogin' && <RegisterOrLogin onLogin={handleGoToLogin} onRegister={handleGoToRegister} onBack={handleBackToLanding} />}
                {view === 'login' && <Login onBack={handleBackToLanding} onLogin={handleLogin} error={error} />}
            </main>
            <footer className={`body__footer`}>Skylab Coders Academy <i className="fab fa-gratipay"></i> Le Sky Martini</footer>
        </body>
    }
}