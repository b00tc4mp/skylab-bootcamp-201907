const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)

        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)

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

    handleFavorites(id) {
        const _email = this.props.user
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
            this.props.onGoLogin()
        }
    }

    handleRegister(event) {
        event.preventDefault()
        this.props.onRegister()
    }

    handleLogin(event) {
        event.preventDefault()
        this.props.onLogin()
    }

    handleLogout(event) {
        event.preventDefault()
        this.props.onLogout()
    }

    render() {

        let _user

        if (this.props.user !== undefined) _user = logic.retrieveUser(this.props.user)

        return <>
        <header>
            {this.props.user !== undefined && <h1>Hello! {_user.name}</h1>}
            <nav>
                {this.props.user === undefined ? <ul>
                    <li><a href="" onClick={this.handleLogin}>Login</a></li>
                    <li><a href="" onClick={this.handleRegister}>Register</a></li> 
                </ul> : <ul>
                    <li><a href="" onClick={this.handleLogout}>Logout</a></li>
                </ul>}
            </nav>
        </header>

       

            <Search onSearch={this.handleSearch} />

            {this.state.duck === undefined ?
                <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} addFavorites={this.handleFavorites} />
                }} onItem={this.handleRetrieveDuck} /> 
                :
                <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />}
        </>
    }
}