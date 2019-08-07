const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'login', credentials: undefined, error: undefined } 

        this.handleRegister = this.handleRegister.bind(this)
        this.handleGoToHome = this.handleGoToHome.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleMenuHome=this.handleMenuHome.bind(this)
        this.handleMenuRegister=this.handleMenuRegister.bind(this)
        this.handleMenuLogin=this.handleMenuLogin.bind(this)
        
   
    }

    handleGoToHome() {
        this.setState({ view: 'home' })
    }

    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(()=> this.setState({ view: 'login' }))
                .catch(({ message }) => this.setState({ error: message }))
             
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleMenuHome(event) {
        event.preventDefault()

        this.setState({ view: 'home' })
    }

    handleMenuRegister(event) {
        event.preventDefault()

        this.setState({ view: 'register' })
    }

    handleMenuLogin(event) {
        event.preventDefault()

        this.setState({ view: 'login' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }
    
    handleGoToRegister() {
        this.setState({ view: 'register' })
    }

    handleLogin(email, password) {
       try {
           logic.authenticateUser(email, password)
               .then(credentials => this.setState({ view: 'home', credentials }))
               .catch(({ message }) => this.setState({ error: message }))
       } catch ({ message }) {
           this.setState({ error: message })
       }
    }

   


    render() {
        const {  state: { view, credentials, error, user}, handleMenuHome, handleMenuLogin, handleMenuRegister, handleRegister, handleFavourite, handleLogout, handleGoToLogin, handleGoToHome, handleGoToRegister, handleLogin } = this
        return  <>

        <header className="header">
            <a href="" className="logo" onClick={handleMenuHome}><img src="logo.jpg" alt=""/></a>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            {!user ? 
                <ul className="menu">
                
                        <li><a href="" onClick={handleMenuRegister}>Register</a></li>
                        <li><a href="" onClick={handleMenuLogin}>Login</a></li>
                </ul> : <ul>
                        <li><a href="#fav" onClick={handleFavourite}>Favorite List</a></li>
                        <li><a href="#logout" onClick={handleLogout}>Logout</a></li>
                        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                        <i class="fa fa-bars"></i></a>
                </ul>}
        </header>
    
            {view === 'home' && <Home onRegister={handleGoToRegister} onLogin={handleGoToLogin} />}
            { view === "register" && <Register onBack={handleGoToHome} onLogin={handleGoToLogin} onRegister={handleRegister} error={error} />} 
            { view === "login" && <Login onBack={handleGoToHome} onRegister={handleGoToRegister} onLogin={handleLogin} error={error} />} 
       
        
          <footer>
                <p>Copyrigth © SkyLab 2019 </p>
            </footer>
        </>
       /*  return <>
            {view === 'landing' && <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} credentials={credentials} onLogout={handleLogout} />}
            {view === 'register' && <Register onBack={handleBackToLanding} onRegister={handleRegister} error={error} />}
            {view === 'register-success' && <RegisterSuccess onLogin={handleGoToLogin} />}
            {view === 'login' && <Login onBack={handleBackToLanding} onLogin={handleLogin} error={error} />} */
    }
}