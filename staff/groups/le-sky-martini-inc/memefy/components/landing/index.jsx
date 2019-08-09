const { Component } = React

 /**
 * Component that allows the visualization the main behaviour.
 */

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'search', query: undefined, gifs: [], gif: undefined, randomGifs: [], randomGif: undefined, error: undefined, user: undefined, favs: [] }
        // view: 'search', 'favorites'

        this.handleSearch = this.handleSearch.bind(this)
        this.handleCatCats = this.handleCatCats.bind(this)
        this.handleCatDogs = this.handleCatDogs.bind(this)
        this.handleCatBabies = this.handleCatBabies.bind(this)
        this.handleCatMorning = this.handleCatMorning.bind(this)
        this.handleCatCelebrate = this.handleCatCelebrate.bind(this)
        this.handleCatThink = this.handleCatThink.bind(this)
        this.handleCatAnimals= this.handleCatAnimals.bind(this)
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

    componentWillReceiveProps(props) {
        const { favs } = props
        !favs && this.setState({favs: []})
    }
  
    handleSearch(query) {
        const { props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleCatCats(query) {
        const { props: { credentials } } = this

        let id, token

        query="cat"

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleCatAnimals(query) {
        const { props: { credentials } } = this

        let id, token

        query="animals"

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }


    handleCatDogs(query) {
        const { props: { credentials } } = this

        let id, token

        query="dog"

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleCatBabies(query) {
        const { props: { credentials } } = this

        let id, token

        query="baby"

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleCatMorning(query) {
        const { props: { credentials } } = this

        let id, token

        query="morning"

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }


    handleCatCelebrate(query) {
        const { props: { credentials } } = this

        let id, token

        query="celebrate"

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
            .then(( )=>{
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleCatThink(query) {
        const { props: { credentials } } = this

        let id, token
        query="think"

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, query, gif: undefined }))
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

        const { state : { query }} = this
        query && this.handleSearch(query)
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

        this.setState({ view: 'random' , randomGif: undefined, gifs:[]})
    }

    handleBackFromRandomDetail() {
        const { state: { query }, props: { credentials } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)
        if(query){
        logic.searchGifs(id, token, query)
            .then(gifs => this.setState({ gifs, gif: undefined , view: 'search'}))
            .catch(({ message }) => this.setState({ error: message }))}
            else this.setState({  view: 'search' })
    }


    render() {
        const {
            state: { view, gifs, gif, randomGif, error, user, favs },
            handleSearch, handleRetrieveGif, handleRegister,
            handleBackFromDetail, handleLogin, handleLogout,
            handleToggleFavGifFromGifItem, handleToggleFavGifFromGifDetail,
            handleAcceptError, handleFavorites, handleGoToSearch,
            handleToggleFavGifFromFavorites, handleRandom, handleGoToRandom, handleBackFromRandomDetail, handleCatAnimals,
            handleCatCats, handleCatDogs, handleCatBabies,
            handleCatMorning, handleCatCelebrate, handleCatThink
        } = this

        return <section className={`landing`}>
            <header className={`landing__header`}>
                {user && <p className={`landing__header-message`}>Hello, {user.name}!</p>}
                <nav>
                    {!user ? <ul className={`landing__header-menu`}>
                        <li className={`landing__header-item`}>
                            <a className={`landing__header-link`} href="" onClick={handleRegister}><i className="fas fa-user-plus"></i>  Sign up</a>
                        </li>
                        <li className={`landing__header-item`}>
                            <a className={`landing__header-link`} href="" onClick={handleLogin}><i className="fas fa-sign-in-alt"></i>  Sign in
                            </a>
                        </li>
                    </ul> : <ul className={`landing__header-menu`}>
                            {(view === 'search' || view === 'random') && <li className={`landing__header-item`}><a className={`landing__header-link`} href="" onClick={event => {
                                event.preventDefault()

                                handleFavorites()
                            }}>Favorites <i className="fas fa-heart"></i></a></li>}
                            {view === 'favorites' && <li className={`landing__header-item`}><a className={`landing__header-link`}href="" onClick={handleGoToSearch}><i class="fas fa-arrow-left"></i> Search</a></li>}
                            <li className={`landing__header-item`}><a className={`landing__header-link`} href="" onClick={handleLogout}>Logout <i className="fas fa-sign-out-alt"></i></a></li>
                        </ul>}
                </nav>
            </header>

            <main>
                <section className={`search`}>
                    {view === 'search' && <>
                    <div className={`search__bar`}>
                        <h3 className={`search__title`}>Search</h3>
                        <Search onSearch={handleSearch} />
                        <Categories onClickCatAnimals={handleCatAnimals} onClickCatCats={handleCatCats} onClickCatDogs={handleCatDogs} onClickCatBabies={handleCatBabies} onClickCatMorning={handleCatMorning} onClickCatCelebrate={handleCatCelebrate} onClickCatThink={handleCatThink}/>
                    </div>
                    <div className={`random`}>
                        <h3 className={`random__title1`}>GIF<span className={`random__title2`}>.TV</span></h3>
                        <img className={`random__tv-icon`} src="http://25.media.tumblr.com/ee5078721ddb2c202e4b67674c9ac40f/tumblr_mgfkslJuRX1ri23bwo1_500.gif" onClick={handleGoToRandom}></img>
                    </div>
                            {!gif ?
                                <Results items={gifs} paintItem={gif => {
                                    return <GifItem gif={gif} onToggle={handleToggleFavGifFromGifItem} />
                                }} onItem={handleRetrieveGif} />
                                :
                                <GifDetail gif={gif} onBack={handleBackFromDetail} onToggle={handleToggleFavGifFromGifDetail} />}

                            {error && <Modal message={error} onAccept={handleAcceptError} />}
                    </>}
                
                    {view === 'random' && <>
                    <div className={`random__detail`}>
                        <h3 className={`random__detail-title`}>Start zapping!</h3> 
                    </div>                    
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
                        <h3 className={`search__favorite-title`}>Favorites</h3>
                        <Results items={favs} paintItem={gif => {
                            return <GifDetail gif={gif} onToggle={handleToggleFavGifFromFavorites} />
                        }} onItem={handleRetrieveGif} />
                    </>}
                </section>
            </main>
        </section>
    }
}