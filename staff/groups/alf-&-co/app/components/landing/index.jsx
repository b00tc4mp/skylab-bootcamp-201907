const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'collections', search: false, query: undefined, collection: undefined, movies: [], movie: undefined, error: undefined, user: undefined, favs: [] }

        this.handleGoToFavorites=this.handleGoToFavorites.bind(this)
        this.handleGoToCollections=this.handleGoToCollections.bind(this)
        this.handleLinkToCollections=this.handleLinkToCollections.bind(this)
        this.handleLogOut=this.handleLogOut.bind(this)
        this.handleGoToSearch=this.handleGoToSearch.bind(this)
        this.handleGoToLogIn=this.handleGoToLogIn.bind(this)
        this.handleSearch=this.handleSearch.bind(this)
        this.handleAcceptError = this.handleAcceptError.bind(this)
        this.handleRetrieveMovie=this.handleRetrieveMovie.bind(this)
        this.handleToggleFavMovieFromMovieDetail=this.handleToggleFavMovieFromMovieDetail.bind(this)
        this.handleBackFromDetail=this.handleBackFromDetail.bind(this)
        this.handleToggleFavMovieFromMovieItem=this.handleToggleFavMovieFromMovieItem.bind(this)
    }

    /* Handlers */

    handleGoToCollections(collection){
        const { props: { credentials } } = this
        let id, token
        let collections = true
       

        credentials && (id = credentials.id, token = credentials.token)
        
        logic.searchMovies(id, token, collection, collections)
            .then(movies => this.setState( {movies, collection, view: 'results', query: undefined} ))
            .catch(error => this.setState( { error: error.message }))
    }

    handleLinkToCollections(){
        this.setState({view:'collections'})
    }
   
    handleGoToSearch(event){
        event.preventDefault()
        this.setState({ search: true })
    }


   
    handleSearch(query){
        event.preventDefault()
        const { props: { credentials } } = this
        let id, token

        credentials && (id = credentials.id, token = credentials.token)
        

        logic.searchMovies(id, token, query)
            .then(movies => this.setState( {movies, query, view: 'results', collection: undefined} ))
            .catch(error => this.setState( { error: error.message }))
    }

    handleGoToFavorites() {

    }

    handleRetrieveMovie(id){
        console.log(id)

    }

    handleGoToSearch(){
        event.preventDefault()
        this.setState({search: true})
    }

  

    handleGoToLogIn(event){
        event.preventDefault()
    
        this.props.goToLogin()
    
    }

    handleLogOut(event){
        event.preventDefault()
    
        const {props: {onLogOut} } = this
    
        this.setState({user: undefined, view: 'collections'}, ()=> onLogOut())
    }

    handleAcceptError() {
        this.setState({ error: undefined })
    }
<<<<<<< HEAD
    handleRetrieveMovie(movieId){
        const { props: {credentials } } = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveMovie(id, token, movieId)
        .then(movie => this.setState({movie, view: 'detail'}))
        .catch(({message}) => this.setState({error: message}))
        
        
=======

    handleRetrieveMovie(){
>>>>>>> origin/movie-lab/develop

    }

    handleToggleFavMovieFromMovieDetail(movieId) {
        const { props : { goToLogin, credentials }, handleRetrieveMovie } = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavMovie(id, token, movieId, () => handleRetrieveMovie(movieId)) : goToLogin()
    }

    handleBackFromDetail(){
    }

    handleToggleFavMovieFromMovieItem(movieId) {
        const { props : { goToLogin, credentials }, handleSearch, handleGoToCollections, state: { query, collection } } = this

        let id, token
  
        credentials && (id = credentials.id, token = credentials.token)


        credentials ? logic.toggleFavMovie(id, token, movieId, () => collection ? handleGoToCollections(collection) : handleSearch(query)) : goToLogin()

    }


    /* Render */

    render() {
        const {
            state: { view, search, movie, movies, query, error, user, favs },
            handleSearch, handleRetrieveMovie, handleLogOut,
            handleBackFromDetail, handleGoToSearch, handleGoToLogIn,
            handleToggleFavMovieFromMovieItem, handleToggleFavMovieFromMovieDetail, handleGoToCollections, handleLinkToCollections, handleGoToFavorites
        } = this

        return <>
            <header className="panel--nav">
                <nav>
                    <ul>
                        <li><a href="" onClick={handleGoToFavorites}>Favorites</a></li>
                        <li><a href="" onClick={handleGoToCollections}>Collections</a></li>
                        <li><a href="" onClick={handleLogOut}>Logout</a></li>
                    </ul>
                    <h2 className="logo">MOVIE LAB</h2>

                    <ul className= "icons-header">
                        <li><a href="" onClick={handleGoToSearch}><i className="fas fa-search"></i></a></li>
                        

                        {!user ?<li><a href="" onClick={handleGoToLogIn}><i className="fas fa-user"></i></a></li>
                        :
                        <li><a href="" onClick={handleGoToLogIn}>{user.name}</a></li>
                        }
                    </ul>
                </nav>
            </header>
            <main>
                {/* Search state is false by default. It's only displayed when clicked on search button */}
                { search && <Search onSearch={handleSearch}></Search> }

                {/* Default view on landing <main>. Displays collections of movies. */}
                {view === 'collections' && <Collections onCollection={handleGoToCollections}></Collections>}
                   
                {/* Only displayed after query search or click on a collection. Composed by a grid of movie items with title, rating, poster, director and a fav button */}
                {view === 'results' &&
                    <Results movies={movies} paintItem={movie => {
                        return <MovieItem movie={movie} onToggle={handleToggleFavMovieFromMovieItem} />
                    }} onItem={handleRetrieveMovie} />}

                {/* Movie detail which displays title, poster, overview, director, rating, release_date, main cast. Includes fav button and back button  */}
                {view === 'detail' &&
                    <MovieDetail movie={movie} onBack={handleBackFromDetail} onToggle={handleToggleFavMovieFromMovieDetail} />}
            </main>
            <footer>
            <ul className="panel--foot">
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