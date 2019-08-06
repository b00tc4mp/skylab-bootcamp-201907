const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing' }

        this.handleRegister = this.handleRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGotToRegister = this.handleGotToRegister.bind(this)
    }

    handleGotToRegister() {
        this.setState({ view: 'register' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
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


    render() {

        const { state: { view }, handleGotToRegister, handleGoToLogin, handleRegister } = this

        return <>
            {view === 'landing' && <Landing onRegister={handleGotToRegister} onLogin={handleGoToLogin} />}
            {view === "landing" && <Register onRegister={handleRegister} />}
        </>
    }
}