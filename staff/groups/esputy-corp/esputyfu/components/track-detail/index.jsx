function TrackDetail({ track: { url, favorite, linkAlbum, nameAlbum, releaseDate, linkkArtist, nameArtist, explicit, linkTrack, idTrack, nameTrack, popularity, previewUrl }, onToggle }) {
    return <>
        <div className='container'>
        <img className='container__img' src={url} />
        
        <FavButton active={favorite} onToggle={() => onToggle(idTrack)}/>
        <h3>{nameTrack}</h3>
        <ul className='container__ul--detail'>
            <li className='container__li'>{nameArtist}</li>
            <li className='container__li--detail'>{nameAlbum}</li>
            <li className='container__li--detail'>Popularity: {popularity}</li>
        </ul>
        {previewUrl !== null ? <audio controls>
            <source src={previewUrl} type="audio/ogg"></source>
            <source src={previewUrl} type="audio/mp3"></source>
        </audio> : <p>Lo siento spotify no tiene preview de esta canción</p>}
        </div>
    </>
}