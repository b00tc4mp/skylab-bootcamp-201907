const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined, favstemp: [], landing: true , register:false , login: false}

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
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

    handleRegister(name, surname, email, password) {
        try {
            logic.register(name, surname, email, password)
        } catch (error) {
            console.error(error)
        }
    }

    handleLogin(email, password) {
        try {
            logic.login(email, password)
        } catch (error) {
            console.error(error)
        }
    }

    addFavs(id) {
        try {
            logic.addFavs(id)
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return <>
            {this.state.landing && <Search onSearch={this.handleSearch} />}
            <div> <a onClick={
                event => { 
                    event.preventDefault()
                    this.setState({ landing:false , register:true })
                 }
            } href="">Register</a><a onClick={
                event => { 
                    event.preventDefault()
                    this.setState({ landing:false , login:true })
                 }
            } href="">Login</a></div>
            {!this.state.duck ?
                this.state.landing && <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} />
                }} onItem={this.handleRetrieveDuck} />
                :
                this.state.landing && <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})}
                />}
            {this.state.register && <Register onRegister={this.handleRegister} />}
            {this.state.login && <Login onLogin={this.handleLogin} />}
        </>
    }
}