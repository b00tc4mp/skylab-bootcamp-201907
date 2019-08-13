const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', email: undefined, user: undefined}

        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToBack = this.handleGoToBack.bind(this)

    }

    handleRegister(name, surname, email, password) {
        try {
            logic.register(name, surname, email, password)

            this.setState({ view: 'register-succes'})
        } catch (error) {
            console.error(error)
        }
    }

    handleLogin(email, password) {
        try {
            logic.login(email, password)
            this.setState({ view: 'landing', email })
        } catch (error) {
            console.error(error)
        }
    }

    handleGoToRegister() {
        this.setState({ view: 'register' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    handleGoToBack() {
        this.setState({ view: 'landing' })
    }

    handleLogout() {
        this.setState({ email: undefined })
    }

    render() {
        return<>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin} user={this.state.email} onLogout={this.handleLogout} onGoLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onRegister={this.handleRegister} onBack={this.handleGoToBack} />}
            {this.state.view === 'register-succes' && <RegisterSucces onLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onLogin={this.handleLogin} onBack={this.handleGoToBack} />}
        </>
    }
}