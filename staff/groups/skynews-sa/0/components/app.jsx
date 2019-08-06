const {Component}=React 

class App extends Component{

    constructor(){
        super()
        this.state={view:"landing",credentials:undefined,error:undefined}

        this.handleGoLogin=this.handleGoLogin.bind(this)
        this.handleGoRegister=this.handleGoRegister.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.handleBackToLanding=this.handleBackToLanding.bind(this)

    }
    /* LANDING */
    handleGoRegister(){
        this.setState({view:"register"})
    }
    handleGoLogin(){
        this.setState({view:"login"})
    }
    /*BACK */
    handleBackToLanding(){
        this.setState({view:"landing"})
    }
    /*REGISTER */
    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => this.setState({ view: 'register-success' }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }
    /*LOGIN */
    handleLogin(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(credentials => this.setState({ view: 'landing', credentials }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    render() {
        const { state: { view, error }, handleGoRegister, handleGoLogin ,handleRegister, handleLogin, handleBackToLanding} = this

        return <>
            {view === 'landing' && <Landing onRegister={handleGoRegister} onLogin={handleGoLogin} />}
            {view=== 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
            {view === 'register-success' && <RegisterSuccess onLogin={handleGoLogin} error={error}/>}
            {view=== 'login' &&<Login onLogin={handleLogin} onBack={handleBackToLanding} error={error}/>}

        </>
    }
}