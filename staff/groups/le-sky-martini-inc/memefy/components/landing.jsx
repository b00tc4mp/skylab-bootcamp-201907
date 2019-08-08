const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'search', query: undefined, gifs: [], gif: undefined, randomGifs: [], randomGif: undefined, error: undefined, user: undefined, favs: [] }
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
        this.handleRandom = this.handleRandom.bind(this)
        this.handleGoToRandom = this.handleGoToRandom.bind(this)
        this.handleBackFromRandomDetail = this.handleBackFromRandomDetail.bind(this)
        // this.handleRegisterOrLogin = this.handleRegisterOrLogin.bind(this)
        // this.handleGoToRegisterOrLogin = this.handleGoToRegisterOrLogin.bind(this)

    }

    // handleRegisterOrLogin(event) {
    //     event.preventDefault()

    //      this.props.onLogin()
    // }

    // handleGoToRegisterOrLogin(event) {
    //     event.preventDefault()

    //     this.setState({ view: 'registerorlogin' })
    // }


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
        const { props: { onRegisterOrLogin, credentials }, handleSearch, state: { query } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavGif(id, token, gifId).then(() => handleSearch(query)).catch(({ message }) => this.setState({ error: message })) : onRegisterOrLogin()
    }

    handleToggleFavGifFromGifDetail(gifId) {
        const { props: { onRegisterOrLogin, credentials }, handleRetrieveGif } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavGif(id, token, gifId).then(() => handleRetrieveGif(gifId)).catch(({ message }) => this.setState({ error: message })) : onRegisterOrLogin()
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
        const { props: { onRegisterOrLogin, credentials }, handleFavorites } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavGif(id, token, gifId).then(() => handleFavorites()).catch(({ message }) => this.setState({ error: message })) : onRegisterOrLogin() /// !!!!
    }

    handleRandom(gifId) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.getRandom(id, token, gifId)
            .then(randomGif => this.setState({ randomGif }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleGoToRandom(event) {
        event.preventDefault()

        this.setState({ view: 'random' })
    }

    handleBackFromRandomDetail() {
        event.preventDefault()

        this.setState({ view: 'search' })
    }


    render() {
        const {
            state: { view, gifs, gif, randomGif, error, user, favs },
            handleSearch, handleRetrieveGif, handleRegister,
            handleBackFromDetail, handleLogin, handleLogout,
            handleToggleFavGifFromGifItem, handleToggleFavGifFromGifDetail,
            handleAcceptError, handleFavorites, handleGoToSearch,
            handleToggleFavGifFromFavorites, handleRandom, handleGoToRandom, handleBackFromRandomDetail
        } = this

        return <section className={`landing`}>
            <header className={`landing__header`}>
                {user && <p>Hello, {user.name}! <i className="fas fa-user-circle"></i></p>}
                <nav>
                    {!user ? <ul className={`landing__header-menu`}>
                        <li className={`landing__header-item`}>
                            <a className={`landing__header-register`} href="" onClick={handleRegister}><i className="fas fa-user-plus"></i>  Register</a>
                        </li>
                        <li className={`landing__header-item`}>
                            <a className={`landing__header-login`} href="" onClick={handleLogin}><i className="fas fa-sign-in-alt"></i>  Login
                            </a>
                        </li>
                    </ul> : <ul className={`landing__header-menu`}>
                            {(view === 'search' || view === 'random') && <li><a href="" onClick={event => {
                                event.preventDefault()

                                handleFavorites()
                            }}>Favorites <i className="fas fa-heart"></i></a></li>}
                            {view === 'favorites' && <li><a href="" onClick={handleGoToSearch}>Search</a></li>}
                            <li><a href="" onClick={handleLogout}>Logout <i className="fas fa-sign-out-alt"></i></a></li>
                        </ul>}
                </nav>
            </header>

                <h1 className={`landing__title`}>Welcome!</h1>

                <section className={`search`}>
                    {view === 'search' && <>
                        <h3>Search</h3>
                        <Search onSearch={handleSearch} />

                        <h3>or go to GIF TV!</h3>
                        <img className={`random__tv-icon`}src="http://lesismor.co.uk/gf/Retro-TV-icon.png" onClick={handleGoToRandom}></img>

                        
                            {!gif ?
                                <Results items={gifs} paintItem={gif => {
                                    return <GifItem gif={gif} onToggle={handleToggleFavGifFromGifItem} />
                                }} onItem={handleRetrieveGif} />
                                :
                                <GifDetail gif={gif} onBack={handleBackFromDetail} onToggle={handleToggleFavGifFromGifDetail} />}

                            {error && <Modal message={error} onAccept={handleAcceptError} />}
                    </>}
                
                    {view === 'random' && <>
                        <h3>Start zapping!</h3> 

                        {!randomGif ?
                            <Results items={gifs} paintItem={gif => {
                                return <GifItem gif={gif} onToggle={handleToggleFavGifFromGifItem} />
                            }} onItem={handleRetrieveGif} />
                            :
                            <RandomDetail randomGif={randomGif} />}

                        {error && <Modal message={error} onAccept={handleAcceptError} 
                        />}

                        <Random onRandom={handleRandom} onBack={handleBackFromRandomDetail} />

                    </>}

                    {view === 'favorites' && <>
                        <h3>Favorites</h3>
                        <Results items={favs} paintItem={gif => {
                            return <GifDetail gif={gif} onToggle={handleToggleFavGifFromFavorites} />
                        }} onItem={handleRetrieveGif} />
                    </>}
                </section>
        </section>
    }
}