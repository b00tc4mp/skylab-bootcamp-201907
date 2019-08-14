const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { query: undefined, ducks: [], duck: undefined }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleBackFromDetail = this.handleBackFromDetail.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleToggleFavDuckFromDuckItem = this.handleToggleFavDuckFromDuckItem.bind(this)
        this.handleToggleFavDuckFromDuckDetail = this.handleToggleFavDuckFromDuckDetail.bind(this)
    }

    handleSearch(query) {
        const { props: {user}} = this
        logic.searchDucks(user, query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks, query })
        })
    }

    handleRetrieveDuck(id) {
        const { props: {user}} = this
        logic.retrieveDuck(user,id, (error, duck) => {
            if (error) console.error(error)
            else this.setState({ duck })
        })
    }

    handleRegister(event) {
        event.preventDefault()

        this.props.onRegister()
    }

    handleBackFromDetail() {
        const { state: { query }, props: { user } } = this

        logic.searchDucks(user, query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks, duck: undefined })
        })
    }

    handleLogin(event) {
        event.preventDefault()

        this.props.onLogin()
    }

    handleLogout(event) {
        event.preventDefault()

        this.props.onLogout()
    }

    handleToggleFavDuckFromDuckItem(id) {
        const { props: { user, onLogin }, handleSearch, state: { query } } = this

        user ? logic.toggleFavDuck(user, id, () => handleSearch(query)) : onLogin()
    }

    handleToggleFavDuckFromDuckDetail(id) {
        const { props: { user, onLogin }, handleRetrieveDuck } = this

        user ? logic.toggleFavDuck(user, id, () => handleRetrieveDuck(id)) : onLogin()
    }

    render() {
        const { state: { ducks, duck }, handleSearch, handleRetrieveDuck, handleRegister, handleBackFromDetail, handleLogin, handleLogout, handleToggleFavDuckFromDuckDetail, handleToggleFavDuckFromDuckItem, props: { user } } = this

        let _user

        if (user) _user = logic.retrieveUser(user)

        return <>
            <header>
                {_user && <p>Hello,{_user.name}</p> }
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
                    return <DuckItem duck={duck} user={user} onToggle={handleToggleFavDuckFromDuckItem}/>
                }} onItem={handleRetrieveDuck} />
                :
                <DuckDetail duck={duck} onBack={handleBackFromDetail} user={user} onToggle={handleToggleFavDuckFromDuckDetail} />}
        </>
    }
}