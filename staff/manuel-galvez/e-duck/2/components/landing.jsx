const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined  }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleBackFromDetail = this.handleBackFromDetail.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleRetrieveUser = this.handleRetrieveUser.bind(this)
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

    handleRegister(event) {
        event.preventDefault()

        this.props.onRegister()
    }

    handleBackFromDetail() {
        this.setState({ duck: undefined })
    }

    handleLogin(event) {
        event.preventDefault()

        this.props.onLogin()
    }

    handleLogout(event) {
        event.preventDefault()

        this.props.onLogout()
    }

    handleRetrieveUser(email) {
        try {
            return logic.retrieveUser(email)
        } catch(error) {
            console.log(error)
        }

    }

    render() {
        const { state: { ducks, duck }, handleSearch, handleRetrieveDuck, handleRegister, handleBackFromDetail, handleLogin, handleLogout, handleRetrieveUser,  props: { user } } = this

        //let _user = user &&  logic.retrieveUser(user)
        let _user = user && handleRetrieveUser(user)

        return <>
            <header> 
                {_user && <p>Hello, {_user.name}</p>}
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

            <Search onSearch={handleSearch} />

            {!duck ?
                <Results items={ducks} paintItem={duck => {
                    return <DuckItem duck={duck} />
                }} onItem={handleRetrieveDuck} />
                :
                <DuckDetail duck={duck} onBack={handleBackFromDetail} />}
        </>
    }
}