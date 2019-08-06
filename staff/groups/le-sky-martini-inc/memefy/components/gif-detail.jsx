function GifDetail({ gif: { data: { id, title, images, import_datetime, bitly_url, source}, favorite }, onBack, onToggle }) {
    return <>
        <h3>{title}</h3>
        <p>{id}</p>
        <img src={images.downsized_large.url}/>
        <p>{import_datetime}</p>
        <p>View on Gihpy: {bitly_url}</p>
        <p>Originaly posted on: {source}</p>
        <FavButton active={favorite} onToggle={() => onToggle(id)}/>
        {onBack && <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>}
    </>
}