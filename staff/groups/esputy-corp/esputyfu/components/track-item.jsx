function TrackItem({ track: { nameTrack, nameArtist, nameAlbum, url } }) {
    return <>
        <img src={url} />
        <h3>{nameTrack}</h3>
        <p>{nameArtist} · {nameAlbum}</p>
    </>

}