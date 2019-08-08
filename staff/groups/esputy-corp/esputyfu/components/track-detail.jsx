function TrackDetail({ track: { url, favorite, linkAlbum, nameAlbum, releaseDate, linkkArtist, nameArtist, explicit, linkTrack, idTrack, nameTrack, popularity, previewUrl }, onToggle }) {
    return <>
        <img src={url} />
        
        <FavButton active={favorite} onToggle={() => onToggle(idTrack)}/>
        <h3>{nameTrack}</h3>
        <ul>
            <li>{nameArtist}</li>
            <li>{nameAlbum}</li>
            <li>{popularity}</li>
        </ul>
        {previewUrl !== null ? <audio controls>
            <source src={previewUrl} type="audio/ogg"></source>
            <source src={previewUrl} type="audio/mp3"></source>
        </audio> : <p>Lo siento spotify no tiene preview de esta canción</p>}

    </>
}