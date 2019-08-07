function SongItem({ track }, onToggle) {
    return <>
        <h3>{track.track_name}</h3>
        <h4>{track.artist_name}</h4>
        <h5>{track.album_name}</h5>
        <p>❤</p>
        <p>👁‍🗨</p>
        {/* <FavButton active={favorite} onToggle={() => onToggle(commontrack_id)} /> */}
        {/* <DisplayLyrics active={display} onToggle={() => onToggle(track_id)} /> */}
    </>
}