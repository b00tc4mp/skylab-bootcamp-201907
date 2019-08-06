const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', credentials: undefined, error: undefined, register_success: undefined }

        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleGoToLogIn = this.handleGoToLogIn.bind(this)
        this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this)
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this)
        this.handleGoToSignUp = this.handleGoToSignUp.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)

    }

    handleBackToLanding() {
        this.setState({ view: 'landing' })
    }

    handleGoToSignUp() {
        this.setState({ view: 'signup', error: undefined })
    }

    handleSubmitSignUp(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => this.setState({ view: 'login', register_success: true }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToLogIn() {
        this.setState({ view: 'login', error: undefined, register_success: undefined })
    }

    handleSubmitLogIn(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(credentials => this.setState({ view: 'landing', credentials, register_success: undefined }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({message}) {
            this.setState({ error: message })
        }
    }
    handleLogOut(){
        this.setState({credentials: undefined})
    }

    render() {
        const { state: { view, credentials, error, register_success }, handleBackToLanding, handleSubmitLogIn, handleSubmitSignUp, handleGoToLogIn, handleGoToSignUp, handleLogOut } = this

        return <>
            {view === 'landing' && <Landing onLogIn={handleGoToLogIn}  credentials={credentials} />}
            {view === 'login' && <LogIn onClose={handleBackToLanding} onLogIn={handleSubmitLogIn} error={error} register_success={register_success} toSignUp={handleGoToSignUp} onLogOut={handleLogOut} />}
            {view === 'signup' && <SignUp onClose={handleBackToLanding} onSignUp={handleSubmitSignUp} error={error} toLogIn={handleGoToLogIn} />}
        </>
    }
}