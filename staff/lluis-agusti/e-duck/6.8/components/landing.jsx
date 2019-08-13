const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'search', query: undefined, ducks: [], duck: undefined, error: undefined, user: undefined, favs: [] }
        // view: 'search', 'favorites'

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleBackFromDetail = this.handleBackFromDetail.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleToggleFavDuckFromDuckItem = this.handleToggleFavDuckFromDuckItem.bind(this)
        this.handleToggleFavDuckFromDuckDetail = this.handleToggleFavDuckFromDuckDetail.bind(this)
        this.handleAcceptError = this.handleAcceptError.bind(this)
        this.handleFavorites = this.handleFavorites.bind(this)
        this.handleGoToSearch = this.handleGoToSearch.bind(this)
        this.handleToggleFavDuckFromFavorites = this.handleToggleFavDuckFromFavorites.bind(this)
    }

    componentWillMount() {
        const { props: { credentials } } = this

        if (credentials) {
            const { id, token } = credentials

            try {
                logic.retrieveUser(id, token)
                    .then(user => this.setState({ user }))
                    .catch(({ message }) => this.setState({ error: message }))
            } catch ({ message }) {
                this.setState({ error: message })
            }
        }
    }

    handleSearch(query) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchDucks(id, token, query)
            .then(ducks => this.setState({ ducks, query }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRetrieveDuck(duckId) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveDuck(id, token, duckId)
            .then(duck => this.setState({ duck }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRegister(event) {
        event.preventDefault()

        this.props.onRegister()
    }

    handleBackFromDetail() {
        const { state: { query }, props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchDucks(id, token, query)
            .then(ducks => this.setState({ ducks, duck: undefined }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleLogin(event) {
        event.preventDefault()

        this.props.onLogin()
    }

    handleLogout(event) {
        event.preventDefault()

        const { props: { onLogout } } = this

        this.setState({ user: undefined, view: 'search' }, () => onLogout())
    }

    handleToggleFavDuckFromDuckItem(duckId) {
        const { props: { onLogin, credentials }, handleSearch, state: { query } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavDuck(id, token, duckId).then(() => handleSearch(query)).catch(({ message }) => this.setState({ error: message })) : onLogin()
    }

    handleToggleFavDuckFromDuckDetail(duckId) {
        const { props: { onLogin, credentials }, handleRetrieveDuck } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavDuck(id, token, duckId).then(() => handleRetrieveDuck(duckId)).catch(({ message }) => this.setState({ error: message })) : onLogin()
    }

    handleAcceptError() {
        this.setState({ error: undefined })
    }

    handleFavorites() {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveFavDucks(id, token)
            .then(favs => this.setState({ view: 'favorites', favs }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleGoToSearch(event) {
        event.preventDefault()

        this.setState({ view: 'search' })
    }

    handleToggleFavDuckFromFavorites(duckId) {
        const { props: { onLogin, credentials }, handleFavorites } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavDuck(id, token, duckId).then(() => handleFavorites()).catch(({ message }) => this.setState({ error: message })) : onLogin()
    }

    render() {
        const {
            state: { view, ducks, duck, error, user, favs },
            handleSearch, handleRetrieveDuck, handleRegister,
            handleBackFromDetail, handleLogin, handleLogout,
            handleToggleFavDuckFromDuckItem, handleToggleFavDuckFromDuckDetail,
            handleAcceptError, handleFavorites, handleGoToSearch,
            handleToggleFavDuckFromFavorites
        } = this

        return <>
            <header>
                {user && <p>Hello, {user.name}</p>}
                <nav>
                    {!user ? <ul>
                        <li><a href="" onClick={handleRegister}>Register</a></li>
                        <li><a href="" onClick={handleLogin}>Login</a></li>
                    </ul> : <ul>
                            {view === 'search' && <li><a href="" onClick={event => {
                                event.preventDefault()

                                handleFavorites()
                            }}>Favorites</a></li>}
                            {view === 'favorites' && <li><a href="" onClick={handleGoToSearch}>Search</a></li>}
                            <li><a href="" onClick={handleLogout}>Logout</a></li>
                        </ul>}

                </nav>
            </header>

            <h1>Landing</h1>

            {view === 'search' && <>
                <h3>Search</h3>
                <Search onSearch={handleSearch} />

                {!duck ?
                    <Results items={ducks} paintItem={duck => {
                        return <DuckItem duck={duck} onToggle={handleToggleFavDuckFromDuckItem} />
                    }} onItem={handleRetrieveDuck} />
                    :
                    <DuckDetail duck={duck} onBack={handleBackFromDetail} onToggle={handleToggleFavDuckFromDuckDetail} />}

                {error && <Modal message={error} onAccept={handleAcceptError} />}
            </>}

            {view === 'favorites' && <>
                <h3>Favorites</h3>
                <Results items={favs} paintItem={duck => {
                    return <DuckDetail duck={duck} onToggle={handleToggleFavDuckFromFavorites} />
                }} onItem={handleRetrieveDuck} />
            </>}
        </>
    }
}