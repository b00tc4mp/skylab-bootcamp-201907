function MovieItem({ movie, onToggle }) {

    return <>
    {/* Only displayed after query search or click on a collection. 
    Composed by a grid of movie items with title, rating, poster and a fav button */}
        <img src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} />
        <h3>{ movie.original_title }</h3>
        <span>{movie.vote_average}</span>
        <a href="">💜</a>
        <span>{ movie.release_date }</span>
        {/*<FavButton active={favorite} onToggle={() => onToggle(id)} />*/}
    </>
}

/*expect(movie.vote_count).toBeDefined()
expect(movie.id).toBeDefined()
expect(movie.video).toBeDefined()
expect(movie.title).toBeDefined()
expect(movie.popularity).toBeDefined()
expect(movie.poster_path).toBeDefined()
expect(movie.original_language).toBeDefined()
expect(movie.original_title).toBeDefined()
expect(movie.genre_ids).toBeDefined()
expect(movie.backdrop_path).toBeDefined()
expect(movie.adult).toBeDefined()
expect(movie.overview).toBeDefined()
expect(movie.release_date).toBeDefined()*/