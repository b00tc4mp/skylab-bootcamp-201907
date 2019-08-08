class App extends React.Component {
    constructor() {
        super()


        this.state = { view: 'landing', credentials: undefined, favs: undefined }

        //bindings

        this.handleRegister = this.handleRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleFavs = this.handleFavs.bind(this)
    }

    //register
    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => this.setState({ view: 'register-success' }))
                .catch(message => console.error(message))

        } catch (error) {
            console.error(error)
        }
    }

    //login
    handleLogin(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(user => {
                    this.setState({ credentials: user, view: 'landing' })
                })
                .catch(message => console.error(message))


        } catch {
            console.error(error)
        }
    }

    // handle
    handleFavs() {
        let id, token

        this.state.credentials && (id = this.state.credentials.id, token = this.state.credentials.token)

        logic.retrieveFavTracks(id, token)
            .then(response => this.setState({favs: response}))
    }

    // navigate
    handleBackToLanding() {
        this.setState({ view: 'landing' })
    }

    handleGoToRegister() {
        this.setState({ view: 'register' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    render() {
        return <>
            <Header onLogin={this.handleGoToLogin} onRegister={this.handleGoToRegister} state={this.state.credentials} onFavorites={this.handleFavs} onLogo={this.handleBackToLanding}/>
            {this.state.view === 'landing' && <Landing credentials={this.state.credentials} onLogin={this.handleGoToLogin} onFavorites={this.state.favs} backFav={this.handleFavs} />}
            {this.state.view === 'register' && <Register onRegister={this.handleRegister} />}
            {this.state.view === 'register-success' && <RegisterSuccess onLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onLogin={this.handleLogin} />}
            <Footer />
        </>
    }
}