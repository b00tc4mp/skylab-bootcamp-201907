function TrackDetail({ track: { url, favorite, linkAlbum, nameAlbum, releaseDate, linkkArtist, nameArtist, explicit, linkTrack, idTrack, nameTrack, popularity, previewUrl }, onBack, onToggle }) {
    return <>
        <img src={url} />
        <h3><a href={linkTrack}>{nameTrack}</a></h3>
        <FavButton active={favorite} onToggle={() => onToggle(idTrack)}/>
        {previewUrl !== null ? <audio controls>
            <source src={previewUrl} type="audio/ogg"></source>
            <source src={previewUrl} type="audio/mp3"></source>
        </audio> : <p>Lo siento spotify no tiene preview de esta canción</p>}
        <ul>
            <li>Artista: <a href={linkkArtist} target="_blank" >{nameArtist}</a></li>
            <li>Album: <a href={linkAlbum} target="_blank" >{nameAlbum}</a></li>
            <li>Creación: {releaseDate}</li>
        </ul>
        {onBack && <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go Back</a>}



    </>
}