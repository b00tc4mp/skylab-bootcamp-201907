class App extends React.Component {
    constructor() {
        super()

        this.state = { view: 'register' }
        
        //bindings

        this.handleRegister = this.handleRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
    }
    //register

    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
            .catch(console.error)

            this.setState({ view: 'register-success' })
        } catch (error) {
            console.error(error)
        }
    }

    handleBackToLanding() {
        this.setState({ view: 'landing' })
    }
    //register-success

    handleGoToLogin() {
        this.setState({ view: 'login'})
    }


    render() {

        return <>
            {this.state.view === 'register' && <Register onRegister={this.handleRegister}/>}
            {this.state.view === 'register-success' && <RegisterSuccess onLogin={this.handleGoToLogin}/>}
        </>
    }
}