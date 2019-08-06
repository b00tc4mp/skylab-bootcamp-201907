const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'search', query: undefined, gifs: [], gif: undefined, error: undefined, user: undefined, favs: [] }
        // view: 'search', 'favorites'

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveGif = this.handleRetrieveGif.bind(this)
        this.handleBackFromDetail = this.handleBackFromDetail.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleToggleFavGifFromGifItem = this.handleToggleFavGifFromGifItem.bind(this)
        this.handleToggleFavGifFromGifDetail = this.handleToggleFavGifFromGifDetail.bind(this)
        this.handleAcceptError = this.handleAcceptError.bind(this)
        this.handleFavorites = this.handleFavorites.bind(this)
        this.handleGoToSearch = this.handleGoToSearch.bind(this)
        this.handleToggleFavGifFromFavorites = this.handleToggleFavGifFromFavorites.bind(this)
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

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRetrieveGif(gifId) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveGif(id, token, gifId)
            .then(gif => this.setState({ gif }))
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

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, gif: undefined }))
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

    handleToggleFavGifFromGifItem(gifId) {
        const { props: { onLogin, credentials }, handleSearch, state: { query } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavGif(id, token, gifId).then(() => handleSearch(query)).catch(({ message }) => this.setState({ error: message })) : onLogin()
    }

    handleToggleFavGifFromGifDetail(gifId) {
        const { props: { onLogin, credentials }, handleRetrieveGif } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavGif(id, token, gifId).then(() => handleRetrieveGif(gifId)).catch(({ message }) => this.setState({ error: message })) : onLogin()
    }

    handleAcceptError() {
        this.setState({ error: undefined })
    }

    handleFavorites() {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveFavGifs(id, token)
            .then(favs => this.setState({ view: 'favorites', favs }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleGoToSearch(event) {
        event.preventDefault()

        this.setState({ view: 'search' })
    }

    handleToggleFavGifFromFavorites(gifId) {
        const { props: { onLogin, credentials }, handleFavorites } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavGif(id, token, gifId).then(() => handleFavorites()).catch(({ message }) => this.setState({ error: message })) : onLogin()
    }

    render() {
        const {
            state: { view, gifs, gif, error, user, favs },
            handleSearch, handleRetrieveGif, handleRegister,
            handleBackFromDetail, handleLogin, handleLogout,
            handleToggleFavGifFromGifItem, handleToggleFavGifFromGifDetail,
            handleAcceptError, handleFavorites, handleGoToSearch,
            handleToggleFavGifFromFavorites
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

                {!gif ?
                    <Results items={gifs} paintItem={gif => {
                        return <GifItem gif={gif} onToggle={handleToggleFavGifFromGifItem} />
                    }} onItem={handleRetrieveGif} />
                    :
                    <GifDetail gif={gif} onBack={handleBackFromDetail} onToggle={handleToggleFavGifFromGifDetail} />}

                {error && <Modal message={error} onAccept={handleAcceptError} />}
            </>}

            {view === 'favorites' && <>
                <h3>Favorites</h3>
                <Results items={favs} paintItem={gif => {
                    return <GifDetail gif={gif} onToggle={handleToggleFavGifFromFavorites} />
                }} onItem={handleRetrieveGif} />
            </>}
<section><ul><li>Cat 1</li>
<li>Cat 1</li>
<li>Cat 1</li>
<li>Cat 1</li>
</ul></section> 
        </>
    }
}