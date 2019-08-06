function MovieDetail({movie, onBack, onToggle}){

    return <>
    {/* Only displayed after query search or click on a collection. 
    Composed by a grid of movie items with title, rating, poster and a fav button */}
        <img src={`http://image.tmdb.org/t/p/w342/${movie.movieComplete.poster_path}`} />
        <h3>{ movie.movieComplete.original_title }</h3>
        <span>{movie.movieComplete.vote_average}</span>
        <a href="">💜</a>
        <span>{ movie.movieComplete.release_date }</span>
        <p>{movie.director}</p>
        <span>{ movie.movieComplete.overview }</span>
        {/* {movie.mainCast.map(movie => <li>{movie}</li>)} */}

        
        {/*<FavButton active={favorite} onToggle={() => onToggle(id)} />*/}
        {onBack && <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>}
    </>
}
