const { Component } = React

class Landing extends Component {
    constructor() {
        super()


        this.state = { view: 'collections', search: false, query: undefined, movieId: undefined, collection: undefined, movies: [], movie: undefined, error: undefined, user: undefined, favs: [], lists: undefined}

        this.handleGoToFavorites = this.handleGoToFavorites.bind(this)
        this.handleGoToCollections = this.handleGoToCollections.bind(this)
        this.handleLinkToCollections = this.handleLinkToCollections.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleGoToSearch = this.handleGoToSearch.bind(this)
        this.handleGoToLogIn = this.handleGoToLogIn.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleAcceptError = this.handleAcceptError.bind(this)
        this.handleRetrieveMovie = this.handleRetrieveMovie.bind(this)
        this.handleToggleFavMovieFromMovieDetail = this.handleToggleFavMovieFromMovieDetail.bind(this)
        this.handleBackFromDetail = this.handleBackFromDetail.bind(this)
        this.handleToggleFavMovieFromMovieItem = this.handleToggleFavMovieFromMovieItem.bind(this)
        this.handleToggleFavMovieFromFavoritesSection = this.handleToggleFavMovieFromFavoritesSection.bind(this)
        this.handleFavorites = this.handleFavorites.bind(this)
        this.handleToggleMovieFromMovieDetail = this.handleToggleMovieFromMovieDetail.bind(this)
        this.handleCreateList = this.handleCreateList.bind(this)
        this.handleRetrieveLists = this.handleRetrieveLists.bind(this)
        this.handleDisplayListModal = this.handleDisplayListModal.bind(this)
        this.handleToggleMovieFromList = this.handleToggleMovieFromList.bind(this)
        this.handleGoToMenuCollections = this.handleGoToMenuCollections.bind(this)
           
    }

    componentWillMount(){
        const { props: { credentials , query , collection} } = this


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
        if (query) this.handleSearch(query)
        if (collection) this.handleGoToCollections(collection)
    }


    /* Handlers */
    handleGoToCollections(collection) {
        const { props: { credentials } } = this
        let id, token
        let collections = true


        credentials && (id = credentials.id, token = credentials.token)

        logic.searchMovies(id, token, collection, collections)
            .then(movies => this.setState({ movies, collection, view: 'results', query: undefined }))
            .catch(error => this.setState({ error: error.message }))
    }

    handleGoToMenuCollections(){
        event.preventDefault()
        this.setState({view: 'collections'})
    }

    handleLinkToCollections() {
        this.setState({ view: 'collections' })
    }

    handleGoToSearch(event) {
        event.preventDefault()
        this.setState({ search: true })
    }

    handleSearch(query) {
        const { props: { credentials } } = this
        let id, token

        credentials && (id = credentials.id, token = credentials.token)


        logic.searchMovies(id, token, query)
            .then(movies => this.setState({ movies, query, view: 'results', collection: undefined }))
            .catch(error => this.setState({ error: error.message }))
    }

    handleGoToFavorites(event) {
        event.preventDefault()
        this.handleFavorites()

    }

    handleFavorites() {
        const { props: { credentials }, goToLogin } = this

        let id, token
        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.retrieveFavMovies(id, token).then(favs => this.setState({ favs, view: 'favorites' })) : goToLogin()
    }

    handleGoToLogIn(event){

        const { state: { query, collection } } = this

        event.preventDefault()
    
        this.props.goToLogin(query, collection)
    
    }

    handleLogOut(event) {

        event.preventDefault()

        const { props: { onLogOut } } = this

        this.setState({ user: undefined, view: 'collections' }, () => onLogOut())

    }

    handleAcceptError() {
        this.setState({ error: undefined })
    }
    handleRetrieveMovie(movieId) {
        const { props: { credentials } } = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveMovie(id, token, movieId)
            .then(movie => this.setState({ movie, view: 'detail' }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleBackFromDetail() {
        const { state: { favs, query, collections }, handleGoToFavorites, handleSearch } = this

        favs ? handleGoToFavorites() : collections ? handleCollections(collections) : handleSearch(query)
    }

    handleToggleFavMovieFromMovieDetail(movieId) {
        const { props: { goToLogin, credentials }, handleRetrieveMovie } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavMovie(id, token, movieId, () => handleRetrieveMovie(movieId)) : goToLogin()
    }

    handleBackFromDetail() {
        const { state: { query, collection }, props: { credentials } } = this
        let id, token
        let collections = true

        credentials && (id = credentials.id, token = credentials.token)
        !collection ? logic.searchMovies(id, token, query)
            .then(movies => this.setState({ movies, query, view: 'results', collection: undefined }))
            .catch(error => this.setState({ error: error.message }))
            :
            logic.searchMovies(id, token, collection, collections)
                .then(movies => this.setState({ movies, collection, view: 'results', query: undefined }))
                .catch(error => this.setState({ error: error.message }))
        /*const {state: {favs, query, collections},  handleGoToFavorites, handleSearch } = this
        favs ? handleGoToFavorites() : collections ? handleCollections(collections) : handleSearch(query)*/
    }

    handleToggleFavMovieFromMovieItem(movieId) {
      
        const { props: { goToLogin, credentials }, handleSearch, handleGoToCollections, state: { query, collection } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavMovie(id, token, movieId).then(() => collection ? handleGoToCollections(collection) : handleSearch(query)) : goToLogin(query, collection)
    }

    handleToggleFavMovieFromMovieDetail(movieId) {
        const { props : { goToLogin, credentials }, handleRetrieveMovie , state:{ query, collection } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavMovie(id, token, movieId).then(() => handleRetrieveMovie(movieId)) : goToLogin(query, collection)
    }

    handleToggleFavMovieFromFavoritesSection(movieId) {
        const { props: { goToLogin, credentials }, handleFavorites, state:{ query, collection } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)
        
        credentials ? logic.toggleFavMovie(id, token, movieId).then(() => handleFavorites()) : goToLogin(query, collection)

    }

    handleToggleMovieFromMovieDetail(movieId) {
        const { props: { goToLogin, credentials } , state:{ query, collection } } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleListModal(id, token, movieId, () => handleListModal()) : goToLogin(query, collection)
    }

    
    handleCreateList(event) {
        event && event.preventDefault()

        const { target: { list: { value: listName } } } = event
      
        const { props: { credentials }, handleRetrieveLists } = this
        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.createList(id, token, listName, () =>  {handleRetrieveLists()}) : console.log(error)
    }

    handleRetrieveLists(movieId) {

        const { props: { credentials } } = this
        let id, token

        movieId && this.setState({movieId})

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.retrieveLists(id, token, movieId, lists => this.setState({lists, view: 'list-modal'})) : console.log('error')
    }

    handleDisplayListModal(movieId) {
        this.handleRetrieveLists(movieId)
    }

    handleToggleMovieFromList(movieId, listName) {
        const { props: { credentials } } = this
        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFromMovieList(id, token, movieId, listName, () => this.handleRetrieveLists(movieId)) : console.log('error')
    }


    /* Render */

    render() {
        const {
            state: { view, search, movie, movies, query, error, user, favs, lists, movieId },
            handleSearch, handleRetrieveMovie, handleLogOut,
            handleBackFromDetail, handleGoToSearch, handleGoToLogIn,
            handleToggleFavMovieFromMovieItem, handleToggleFavMovieFromMovieDetail, handleGoToCollections, handleLinkToCollections, handleGoToFavorites,
            handleToggleFavMovieFromFavoritesSection, handleCreateList, handleDisplayListModal, handleToggleMovieFromList, handleToggleMovieFromMovieDetail,
            handleGoToMenuCollections

        } = this

        return <>
            <header className="panel--nav">
                <nav>
                    <div className="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul className="menu">
                            <li><a href="" onClick={handleGoToFavorites}>Favorites</a></li>
                            <li><a href="" onClick= {handleGoToMenuCollections} >Collections</a></li>
                            <li><a href="" onClick={handleLogOut}>Log Out</a></li>
                        </ul>
                    </div>

                    <h2 className="logo">MOVIE LAB</h2>

                    <ul className="icons-header">
                        <li><a className= "search-icon"href="" onClick={handleGoToSearch}><i className="fas fa-search"></i></a></li>
                        
                        {user && <>
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&rounded=true&background=f7f7f7&color=00ffa6`} />
                        </>}
                        {!user && <li><a href="" onClick={handleGoToLogIn}><i className="fas fa-user"></i></a></li>
                        }
                    </ul>
                </nav>
            </header>
            <main>
                {/* Search state is false by default. It's only displayed when clicked on search button */}
                {search && <Search onSearch={handleSearch}></Search>}

                {/* Default view on landing <main>. Displays collections of movies. */}
                {view === 'collections' && <Collections onCollection={handleGoToCollections} />}

                {/* Only displayed after query search or click on a collection. Composed by a grid of movie items with title, rating, poster, director and a fav button */}
                {view === 'results' &&
                    <Results movies={movies} paintItem={movie => {
                        return <MovieItem movie={movie} onToggle={handleToggleFavMovieFromMovieItem} onClickList={handleDisplayListModal} />
                    }} onItem={handleRetrieveMovie} />}

                {/* Movie detail which displays. Includes fav button and back button  */}
                {view === 'detail' &&
                    <MovieDetail movie={movie} onBack={handleBackFromDetail} /* onList={handleListModal} */ onToggle={handleToggleFavMovieFromMovieDetail} onToggle={handleToggleMovieFromMovieDetail} />}

                {view === 'favorites' &&
                    <Favorites favs={favs} removeFav={handleToggleFavMovieFromFavoritesSection} showDetail={handleRetrieveMovie} />
                }
                {view === 'list-modal' &&
                    <ListModal lists={lists} movieId={movieId} onToggleMovieList={handleToggleMovieFromList} onCreateList={handleCreateList} />
                }

            </main>
            <footer className="panel--foot">              
                 <ul>
                    <li className="red"><a href=""><i className="fab fa-twitter"></i></a></li>
                    <li><a href=""><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href=""><i className="fab fa-instagram"></i></a></li>
                    <li><a href=""><i className="fab fa-pinterest-p"></i></a></li>
                    <li><a href=""><i className="fab fa-tumblr"></i></a></li>
                    <li><a href=""><i className="fab fa-vimeo-v"></i></a></li>
                    <li><a href=""><i className="fab fa-youtube"></i></a></li>
                    <li><a href=""><i className="fab fa-weixin"></i></a></li>
                </ul>
                <p className="registered-name">Movie Lab © 2019 Alf & Co.</p>
            </footer>
        </>
    }

}