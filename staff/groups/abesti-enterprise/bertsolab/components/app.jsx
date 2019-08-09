/**
* Main application container.
*/




const { Component } = React

class App extends Component {
    constructor() {
        super()

        let credentials
        const {id, token}= sessionStorage
        id &&  token && (credentials= { id, token })
        this.state = { view: 'home', credentials, error: undefined } 

        this.handleRegister = this.handleRegister.bind(this)
        this.handleGoToHome = this.handleGoToHome.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleMenuHome=this.handleMenuHome.bind(this)
        this.handleMenuRegister=this.handleMenuRegister.bind(this)
        this.handleMenuLogin=this.handleMenuLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleFavorite=this.handleFavorite.bind(this)

        
   
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
    
    handleLogout(event) {
        event.preventDefault()

        delete sessionStorage.id
        delete sessionStorage.token

        this.setState({ credentials: undefined })
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
               .then(credentials => {
                    sessionStorage.id =credentials.id
                    sessionStorage.token= credentials.token   
                
                    this.setState({ view: 'home', credentials })
               })
               .catch(({ message }) => this.setState({ error: message }))
       } catch ({ message }) {
           this.setState({ error: message })
       }
    }
    
    handleFavorite(event) {

        event.preventDefault()
        const {id, token}= sessionStorage
      

        logic.retrieveFavs(id, token, track_id)
            .then(favs => this.setState({ view: 'favorites', favs }))
            .catch(({ message }) => this.setState({ error: message }))

    }

    

   


    render() {
        const {  state: { view, credentials, error, favorites, user}, handleMenuHome, handleMenuLogin, handleMenuRegister, handleRegister, handleFavorite, handleLogout, handleGoToLogin, handleGoToHome, handleGoToRegister, handleLogin } = this
        return  <>

        <header className="header">
            <a href="" className="header__logo" onClick={handleMenuHome}><img className="header__logo--image" src="./style/images/logo.png" alt="Find your favorite lyrics at Versolab!"/></a>
            <input className="hamburguer-menu__button" type="checkbox" id="menu-btn" />
            <label className="hamburguer-menu__icon" htmlFor="menu-btn"><span className="hamburguer-menu__navicon"></span></label>
           

            {!credentials ? 
                <ul className="user-menu">
                        <li className="user-menu__auth-option" ><a className="user-menu__auth-option-link" href="" onClick={handleMenuRegister}>Register</a></li>
                        <li className="user-menu__auth-option" ><a className="user-menu__auth-option-link" href="" onClick={handleMenuLogin}>Login</a></li>
                </ul> : 
                <ul className="user-menu">
                        <li className="user-menu__auth-option" ><a className="user-menu__auth-option-link" href="" onClick={handleLogout}>Logout</a></li>
                </ul>}
        </header>
    
            {view === 'home' && <Home onRegister={handleGoToRegister} onLogin={handleGoToLogin} credentials={credentials} />}
            { view === "register" && <Register onBack={handleGoToHome} onLogin={handleGoToLogin} onRegister={handleRegister} error={error} />} 
            { view === "login" && <Login onBack={handleGoToHome} onRegister={handleGoToRegister} onLogin={handleLogin} error={error} />} 
        
          <footer className="footer">
                <p className="footer__content">Copyrigth © SkyLab 2019 </p>
            </footer>
        </>
     
    }
}