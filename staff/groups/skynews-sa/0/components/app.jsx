const {Component}=React 

class App extends Component{

    constructor(){
        super()

        let credentials

        const { id, token } = sessionStorage

        id && token && (credentials = { id, token })
        this.state={viewSpinner:false,view:"landing",credentials,error:undefined}

        this.handleGoLogin=this.handleGoLogin.bind(this)
        this.handleGoRegister=this.handleGoRegister.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.handleBackToLanding=this.handleBackToLanding.bind(this)
        this.handleSpinning=this.handleSpinning.bind(this)
        this.handleSpinning1=this.handleSpinning1.bind(this)
        this.handleWeather=this.handleWeather.bind(this)
        this.handleLogout=this.handleLogout.bind(this)

    }
    handleSpinning(){
        this.setState({viewSpinner: true})
  
    }
    handleSpinning1(){
        this.setState({viewSpinner: false})
    }

    /* LANDING */
    handleGoRegister(){
           
            this.setState({view:"register", error:undefined})
    }
    handleGoLogin(){
        this.setState({view:"login", error:undefined})
    }
    /*BACK */
    handleBackToLanding(){
        this.setState({view:"landing", error:undefined})
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

    /*WEATHER*/
    handleWeather(){
        console.log("weather")
    }
    

    /*LOGOUT*/
    handleLogout() {
        this.setState({ credentials: undefined })
    }




    render() {


        const { state: { viewSpinner,view, credentials, error }, handleGoRegister, handleGoLogin ,handleRegister, handleLogin, handleBackToLanding, handleSpinning, handleSpinning1, handleLogout} = this

        return <>
            {view === 'landing' && <Landing onRegister={handleGoRegister} onLogin={handleGoLogin} credentials={credentials} onSpinning={handleSpinning} onStopSpinning={handleSpinning1} onLogout={handleLogout}/>}

            {view=== 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
            {view === 'register-success' && <RegisterSuccess onLogin={handleGoLogin} error={error}/>}
            {view=== 'login' &&<Login onLogin={handleLogin} onBack={handleBackToLanding} error={error}/>}
            {viewSpinner && <Spinner/>}


        </>
    }
}