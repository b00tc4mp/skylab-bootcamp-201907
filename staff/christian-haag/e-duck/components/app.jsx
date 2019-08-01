
class App extends React.Component {
    constructor() {
        super();

        this.state = { view: 'landing', email: undefined, error: undefined } // 'register', 'login', ...

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleFavorites = this.handleFavorites.bind(this)
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

            this.setState({ view: 'register-success' })
        } catch ({ message }) {
            this.setState({ error: message })

        }
    }
    handleFavorites() {
        this.setState({ view: 'favorites' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    handleLogin(email, password) {
        try {
            logic.authenticateUser(email, password)

            this.setState({ view: 'landing', email })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogout() {
        this.setState({ email: undefined })
    }

    render() {
        const { state: { view, email, error }, handleGoToRegister, handleFavorites, handleRegister, handleBackToLanding, handleGoToLogin, handleLogin, handleLogout } = this

        return <>
            {view === 'landing' && <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} user={email} onLogout={handleLogout} />}
            {view === 'register' && <Register onBack={handleBackToLanding} onRegister={handleRegister} error={error} />}
            {view === 'favorites' && <Favorites onFavorites={handleFavorites} onBack={handleBackToLanding} />}
            {view === 'register-success' && <RegisterSuccess onLogin={handleGoToLogin} />}
            {view === 'login' && <Login onBack={handleBackToLanding} onLogin={handleLogin} error={error} />}
        </>
    }
}