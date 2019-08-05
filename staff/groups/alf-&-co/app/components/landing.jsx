const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'collections', search: false, query: undefined, movies: [], movie: undefined, error: undefined, user: undefined, favs: [] }
    }

/* Handlers */



/* Render */
    render() {
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
                {search && <Search onSearch={handleSearch}></Search>}
                {view === 'collections' && <Collections></Collections>}
                {/* This should go into Collection component */}
                {/* <ul>
                    <li><a href="" onClick={handleGoToFavorites}>Action</a></li>
                    <li><a href="" onClick={handleGoToCollections}>Comedy</a></li>
                    <li><a href="" onClick={handleLogout}>Logout</a>Scify</li>
                </ul> */}
                {view === 'results' &&
                    <Results items={movies} paintItem={movie => {
                        return <MovieItem movie={movie} onToggle={handleToggleFavMovieFromMovieItem} />
                    }} onItem={handleRetrieveMovie} />}
                {view === 'detail' &&
                    <MovieDetail movie={movie} onBack={handleBackFromDetail} onToggle={handleToggleFavMovieFromMovieDetail} />}
            </main>
            <footer>
                <p>Movie Lab © 2019 Alf & Co.</p>
                <ul>
                    <li><a href="">Twitter</a></li>
                    <li><a href="">Facebook</a></li>
                    <li><a href="">LinkedIn</a></li>
                </ul>
            </footer>
        </>
    }

}