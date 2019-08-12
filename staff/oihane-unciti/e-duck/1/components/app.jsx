const { Component } = React

class App extends Component{
    constructor (){
        super()

    this.state.view = 'landing'
    this.state.email= undefined

    this.handleGoToRegister =this.handleGoToRegister.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    

    }


    
    handleRegister(name, surname, email, password) {
        try{
            logic.register(name, surname, email, password)
            this.setState({ view : "landing" })   
        }catch{
            console.error(error)
        }
    }

    handleGoToRegister(){
        this.setState( {view: "register"} )
    }


    render(){
        const { state: { view, email }, handleGoToRegister, handleRegister, handleBackToLanding, handleGoToLogin, handleLogin, handleLogout } = this



        return <>
            {view === 'landing' && <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} user={email} onLogout={handleLogout} />}
            {view === 'register' && <Register onBack={handleBackToLanding} onRegister={handleRegister} />}
           
        </>
    }
}

