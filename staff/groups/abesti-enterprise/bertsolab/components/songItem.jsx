function SongItem({ track: { track_id, track_name, artist_name, album_name, favorite}, onDisplay, onToggle}) {
    return <>
        <h3>{track_name}</h3>
        <h4>{artist_name}</h4>
        <h5>{album_name}</h5>

        { <FavButton active={favorite} onToggle={() => onToggle(track_id)} /> } 
        { <DisplayLyrics onDisplay={() => onDisplay(track_id)} />  }

    </>
}