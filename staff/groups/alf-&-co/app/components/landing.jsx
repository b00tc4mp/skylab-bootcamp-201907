const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'collections', search: false, query: undefined, movies: [], movie: undefined, error: undefined, user: undefined, favs: [] }
        
        this.handleGoToFavorites=this.handleGoToFavorites.bind(this)
        this.handleGoToCollections=this.handleGoToCollections.bind(this)
        this.handleLogout=this.handleLogout.bind(this)
        this.handleGoToSearch=this.handleGoToSearch.bind(this)
        this.handleGoToLogin=this.handleGoToLogin.bind(this)
        this.handleSearch=this.handleSearch.bind(this)
        this.handleRetrieveMovie=this.handleRetrieveMovie.bind(this)
        this.handleToggleFavMovieFromMovieDetail=this.handleToggleFavMovieFromMovieDetail.bind(this)
        this.handleBackFromDetail=this.handleBackFromDetail.bind(this)
        this.handleToggleFavMovieFromMovieItem=this.handleToggleFavMovieFromMovieItem.bind(this)
    }


handleGoToFavorites(){

}

handleGoToCollections(){

}
handleLogout(){

}
handleGoToSearch(){

}
handleGoToLogin(){

}
handleSearch(){

}
handleRetrieveMovie(){

}
handleToggleFavMovieFromMovieDetail(){

}
handleBackFromDetail(){

}
handleToggleFavMovieFromMovieItem(){

}


/* Render */
    render() {

        const {
            state: { view, search, movie, movies, query, error, user, favs },
            handleSearch, handleRetrieveMovie, handleLogout,
            handleBackFromDetail, handleGoToSearch, handleGoToLogin,
            handleToggleFavMovieFromMovieItem, handleToggleFavMovieFromMovieDetail, handleGoToCollections, handleGoToFavorites
        } = this

        return <>

        

            <header>
                <nav>
                    <ul>
                        <li><a href="" onClick={handleGoToFavorites}>Favorites</a></li>
                        <li><a href="" onClick={handleGoToCollections}>Collections</a></li>
                        <li><a href="" onClick={handleLogout}>Logout</a></li>
                    </ul>
                    <ul>
                        <img></img>
                        <li><a href="" onClick={handleGoToSearch}>Search</a></li>
                        <li><a href="" onClick={handleGoToLogin}>Login</a></li>
                    </ul>
                </nav>
            </header>
            <main>

                {/* Search state is false by default. It's only displayed when clicked on search button */}
                {search && <Search onSearch={handleSearch}></Search>}

                {/* Default view on landing <main>. Displays collections of movies. */}
                {view === 'collections' && <Collections></Collections>}
                   
                {/* Only displayed after query search or click on a collection. Composed by a grid of movie items with title, rating, poster, director and a fav button */}
                {view === 'results' &&
                    <Results items={movies} paintItem={movie => {
                        return <MovieItem movie={movie} onToggle={handleToggleFavMovieFromMovieItem} />
                    }} onItem={handleRetrieveMovie} />}

                {/* Movie detail which displays title, poster, overview, director, rating, release_date, main cast. Includes fav button and back button  */}
                {view === 'detail' &&
                    <MovieDetail movie={movie} onBack={handleBackFromDetail} onToggle={handleToggleFavMovieFromMovieDetail} />}
            </main>
            <footer>
                <p>Movie Lab © 2019 Alf & Co.</p>
                <ul>
                    <li><a href="">Twitter</a></li>
                    <li><a href="">Facebook</a></li>
                    <li><a href="">Instagram</a></li>
                </ul>
            </footer>
        </>
    }

}