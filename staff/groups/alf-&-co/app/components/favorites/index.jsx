function Favorites({favs, removeFav, showDetail, onClickList}) {
    return  <>
        {favs.length ?
        <Results movies={favs} paintItem={movie => {
            return <MovieItem movie={movie} onToggle={removeFav} onClickList={onClickList} />
        }} onItem={showDetail} />
        : 
        <>  
         <p><i className="far fa-heart"/></p>
         <h3>There are no favorites yet</h3>
         </>}
        </>
}