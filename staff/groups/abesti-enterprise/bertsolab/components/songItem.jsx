 /**
 * Listed item in Results component.
 */

function SongItem({ track: { track_id, track_name, artist_name, album_name, favorite}, onDisplay, onToggle}) {
    return <>
        <section className="song-item">
            <h3 className="song-item__track-name">{track_name}</h3>
            <h4 className="song-item__artist-name">{artist_name}</h4>
            <h5 className="song-item__album-name">{album_name}</h5>

            { <FavButton active={favorite} trackId={track_id.toString()} onToggle={onToggle} /> } 
            { <DisplayLyrics onDisplay={onDisplay} trackId={track_id} />  }
        </section>

    </>
}