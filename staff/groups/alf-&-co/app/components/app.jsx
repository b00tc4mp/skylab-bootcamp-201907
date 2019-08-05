const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'login', credentials: undefined, error: undefined }

        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this)
        this.handleGoToSignUp = this.handleGoToSignUp.bind(this)
       
    }

    handleBackToLanding(){
        this.setState({view: 'landing'})
    }

    handleGoToSignUp() {

    }

    handleSubmitRegister(name, surname, email, password, repassword){
        try {
            logic.registerUser(name, surname, email, password, repassword, error =>{
                if(error) this.setState({error: message})
                else this.setState({view: 'login'})
            })
        }catch({message}){
            this.setState({error: message})
        }
    }
    handleGoToLogin(){
        this.setState({view: 'login'})
    }
    
    handleLogin(username, password){
        try {
            logic.authenticateUser(username, password)
                .then (credentials => this.setState({view: 'landing', credentials}))
                .catch(({message}) => this.setState ({error: message}))
            } catch (message){
                this.setState({message})    
            }
        }


    handleLogin() {

    }

    render() {
        const { state: { view, credentials, error }, handleBackToLanding, handleLogin, handleSubmitRegister, handleGoToLogin, handleGoToSignUp } = this

        return <>
        {view === 'landing' && <Landing mainView={this.state.view} onLogin={handleGoToLogin}/>}
        {view === 'login' && <Login onClose={handleBackToLanding} onLogin={handleLogin} error={error} toSignUp= {handleGoToSignUp}/>}
        {view === 'register' && <SignUp onClose={handleBackToLanding} onSignUp={handleSubmitRegister} error ={error} toLogin ={handleGoToLogin}/>}
        </>
    }
}