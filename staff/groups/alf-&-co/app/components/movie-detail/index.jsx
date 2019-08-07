function MovieDetail({movie, onBack, onToggle}){

    return <>
    {/* Only displayed after query search or click on a collection. 
    Composed by a grid of movie items with title, rating, poster and a fav button */}
        <img src={`http://image.tmdb.org/t/p/w342/${movie.movieComplete.poster_path}`} />
        <FavButton active={movie.movieComplete.favorite} onToggle={() => onToggle(movie.movieComplete.id.toString())} />
        <h3>{ movie.movieComplete.original_title }</h3>
        <span>{ movie.movieComplete.release_date }</span>
        <h4>{ movie.movieComplete.tagline }</h4>
        <span>{movie.movieComplete.vote_average}</span>
        
        <h4>Director</h4>
        <p>{movie.director}</p>
        <h4>Overview</h4>
        <span>{ movie.movieComplete.overview }</span>
        <h4>Main Cast</h4>
        {movie.mainCast.map(movie => <li key={movie}>{movie}</li>)}

        {onBack && <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>}
    </>
}
