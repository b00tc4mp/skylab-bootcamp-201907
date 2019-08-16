function TrackDetail({ track: { url, favorite, linkAlbum, nameAlbum, releaseDate, linkkArtist, nameArtist, explicit, linkTrack, idTrack, nameTrack, popularity, previewUrl }, onBack, onToggle, onView }) {
    return <>
        <div className='container'>
        <img className='container container__img' src={url} />
        <h3><a className='container__a' href={linkTrack}>{nameTrack}</a></h3>
        <FavButton active={favorite} onToggle={() => onToggle(idTrack)}/>
        {previewUrl !== null ? <audio controls >
            <source src={previewUrl} type="audio/ogg"></source>
            <source src={previewUrl} type="audio/mp3"></source>
        </audio> : <p>Lo siento spotify no tiene preview de esta canción</p>}
        <ul className='container__ul--detail'>
            <li>Artista:<a className='container__a' href={linkkArtist} target="_blank" >{nameArtist} <i className="fa fa-external-link" aria-hidden="true"></i></a></li>
            <li>Álbum:<a className='container__a' href={linkAlbum} target="_blank" >{nameAlbum} <i className="fa fa-external-link" aria-hidden="true"></i></a></li>
            <li>Creación: {releaseDate} <i className="fa fa-external-link" aria-hidden="true"></i></li>
        </ul>
        {onView !== 'favorites' && <a className='container__a' href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Atrás</a>}
        </div>
    </>
}