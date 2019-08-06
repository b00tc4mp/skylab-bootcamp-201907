function RandomDetail({ randomGif: { data: { id, title, images, import_datetime, bitly_url, source}, favorite }, onToggle }) {
    return <>
        <h3>RANDOM: {title}</h3>
        <p>{id}</p>
        <img src={images.downsized_large.url}/>
        <p>{import_datetime}</p>
        <p>View on Gihpy: {bitly_url}</p>
        <p>Originaly posted on: {source}</p>
        <FavButton active={favorite} onToggle={() => onToggle(id)}/>
    </>
}