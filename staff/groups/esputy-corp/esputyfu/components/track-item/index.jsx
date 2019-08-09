function TrackItem({ track: { nameTrack, nameArtist, nameAlbum, url, favorite, idTrack }, onToggle }) {
    return <>
        <img className='container__item' src={url} />
        <h3>{nameTrack}</h3>
        <p>{nameArtist} · {nameAlbum}</p>
        <FavButton active={favorite} onToggle={() => onToggle(idTrack)}/>
        <p>-</p>
    </>

}