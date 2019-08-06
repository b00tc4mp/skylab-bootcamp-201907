const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', credentials: undefined, error: undefined } // view: 'register', 'login', ...

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleGoToRegister() {
        this.setState({ view: 'register' })
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
        this.setState({ view: 'login' })
    }

    handleLogin(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(credentials => this.setState({ view: 'landing', credentials }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogout() {
        this.setState({ credentials: undefined })
    }

    render() {
        const { state: { view, credentials, error }, handleGoToRegister, handleRegister, handleBackToLanding, handleGoToLogin, handleLogin, handleLogout } = this

        return <>
            {view === 'landing' && <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} credentials={credentials} onLogout={handleLogout} />}
            {view === 'register' && <Register onBack={handleBackToLanding} onRegister={handleRegister} error={error} />}
            {view === 'register-success' && <RegisterSuccess onLogin={handleGoToLogin} />}
            {view === 'login' && <Login onBack={handleBackToLanding} onLogin={handleLogin} error={error} />}
        </>
    }
}