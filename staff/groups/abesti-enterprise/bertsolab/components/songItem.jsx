function SongItem({ track: { track_id, track_name, artist_name, album_name, favorite}, onDisplay, onToggle}) {
    return <>
        <h3>{track_name}</h3>
        <h4>{artist_name}</h4>
        <h5>{album_name}</h5>

        { <FavButton active={favorite} trackId={track_id.toString()} onToggle={onToggle} /> } 
        { <DisplayLyrics onDisplay={onDisplay} trackId={track_id} />  }

    </>
}