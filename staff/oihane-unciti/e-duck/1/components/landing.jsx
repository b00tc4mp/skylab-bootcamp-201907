const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)

    }

    handleSearch(query) {
        logic.searchDucks(query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks })
        })
    }

    handleLogin(email, password) {
        logic.login(email, password, (error) => {
            if (error) console.error(error)
            else this.setState({ login: true })
        })
    }

    
 
    handleRegister(event) {
        event.preventDefault()
        this.props.onRegister()
    }

    handleRetrieveDuck(id) {
        logic.retrieveDuck(id, (error, duck) => {
            if (error) console.error(error)
            else this.setState({ duck })
        })
    }

    handleBackToLanding(){
        this.setState({view : "landing"})
    }

    render() {
        const { state: { ducks, duck }, handleSearch, handleRetrieveDuck, handleRegister, handleBackFromDetail, handleLogin, handleLogout, props: { user } } = this
        return <>

            <header>
                {/* TODO <p>Hello, {_user.name}</p> */}
                <nav>
                    {!user ? <ul>
                        <li><a href="" onClick={handleRegister}>Register</a></li>
                        <li><a href="" onClick={handleLogin}>Login</a></li>
                    </ul> : <ul>
                            <li><a href="" onClick={handleLogout}>Logout</a></li>
                        </ul>}

                </nav>
            </header>

            <h1>Landing</h1>
            <Search onSearch={this.handleSearch} />

            {!this.state.duck ?
                <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} />
                }} onItem={this.handleRetrieveDuck} />
                :
                <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />
            }

           
        </>
    }
}




function addToFavourite(id){
    for(let i=0; i<users.length; i++){
        if (users[i].status == 1 ){
            users[i].favorites.push(id)

        }
    }
    
}

