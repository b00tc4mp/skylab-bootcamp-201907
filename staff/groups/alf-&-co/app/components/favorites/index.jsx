function Favorites({favs, removeFav, showDetail}) {
    return  <>
        {favs.length ?
        <Results movies={favs} paintItem={movie => {
            return <MovieItem movie={movie} onToggle={removeFav} />
        }} onItem={showDetail} />
        : 
        <>  
         <p><i className="far fa-heart"/></p>
         <h3>There are no favorites yet</h3>
         </>}
        </>
}