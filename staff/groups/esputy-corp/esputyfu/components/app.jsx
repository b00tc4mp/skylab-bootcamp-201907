class App extends React.Component {
    constructor() {
        super()

        //session storage
        let credentials
        const { id, token } = sessionStorage
        id && token && (credentials = { id, token })

        //sattes
        this.state = { view: 'search', credentials, favs: undefined }

        //bindings
        this.handleRegister = this.handleRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleFavs = this.handleFavs.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
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
                    sessionStorage.id = user.id
                    sessionStorage.token = user.token

                    this.setState({ credentials: user, view: 'search' })
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
            .then(response => this.setState({ view: 'favorites', favs: response }))
    }

    // navigate
    handleBackToLanding() {
        this.setState({ view: 'search' })
    }

    handleGoToRegister() {
        this.setState({ view: 'register' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    handleLogout() {
        delete sessionStorage.id
        delete sessionStorage.token

        this.setState({ view: 'search', credentials: undefined, favs: undefined })
    }

    render() {
        return <>
            <Header onLogin={this.handleGoToLogin} onRegister={this.handleGoToRegister} state={this.state.credentials} nav={this.state.view} onFavorites={this.handleFavs} onSearch={this.handleBackToLanding} onLogout={this.handleLogout} />

            {(this.state.view === 'search' || this.state.view === 'favorites') && <Landing nav={this.state.view} credentials={this.state.credentials} onGoToSearch={this.handleBackToLanding} onLogin={this.handleGoToLogin} onFavorites={this.state.favs} backFav={this.handleFavs} />}

            {this.state.view === 'register' && <Register onRegister={this.handleRegister} />}

            {this.state.view === 'register-success' && <RegisterSuccess onLogin={this.handleGoToLogin} />}

            {this.state.view === 'login' && <Login onLogin={this.handleLogin} />}
            <Footer />
        </>
    }
}