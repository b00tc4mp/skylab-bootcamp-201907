const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined, nav: 'search', email: undefined}

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.navRegister = this.navRegister.bind(this)
        this.navLogin = this.navLogin.bind(this)
        this.handleFavorites = this.handleFavorites.bind(this)
    }

    handleSearch(query) {
        logic.searchDucks(query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks })
        })
    }

    handleRetrieveDuck(id) {
        logic.retrieveDuck(id, (error, duck) => {
            if (error) console.error(error)
            else this.setState({ duck })
        })
    }

    handleLogin(email, password) {
        try {
            logic.login(email, password)
            this.setState({ nav: 'search' })
            this.setState({ email: email })
        } catch (error) {
            console.error(error)
        }
    }

    handleRegister(name, surname, email, password) {
        try {
            logic.register(name, surname, email, password)
            this.setState({ nav: 'login' })
        } catch (error) {
            console.error(error)
        }
    }

    navLogin() {
        this.setState({ nav: 'login' })
    }

    navRegister() {
        this.setState({ nav: 'register' })
    }

    handleFavorites(id) {
        const _email = this.state.email
        // const user = users.find(element => {return element.email === "manuelbarzi@gmail.com"})
        // const verify = user.favorite.find(element => {return element === id})
        if (!(_email === undefined)) {
            // if (userFav.find(id)) {
            //     logic.removeDuckFromFavorites(_email, id)
            // } else {
                logic.addDuckToFavorites(_email, id, error => {
                    if (error) console.error(error)
                    })
            // }
        } else {
            console.log('No estás logueado!')
        }
    }

    render() {
        return <>
            <ul>
                <li><a href="" onClick={event => {
                    event.preventDefault() 
                    this.navLogin()
                }
                    }>Login</a></li>

                <li><a href="" onClick={event => {
                    event.preventDefault() 
                    this.navRegister()
                }
                    }>Register</a></li>
            </ul>

            {this.state.nav === 'login' && <Login onLogin={this.handleLogin} />}
            {this.state.nav === 'register' && <Register onRegister={this.handleRegister} />}

            {this.state.nav === 'search' && <Search onSearch={this.handleSearch} />}

            {this.state.duck === undefined ?
                <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} addFavorites={this.handleFavorites} />
                }} onItem={this.handleRetrieveDuck} /> 
                :
                <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />}
        </>
    }
}