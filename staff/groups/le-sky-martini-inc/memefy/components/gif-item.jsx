function GifItem({ gif: { id, title, images, favorite }, onToggle }) {
    debugger
    return <>
        <h3>{title}</h3>
        <img src={images.downsized_large.url} />
        <FavButton active={favorite} onToggle={() => onToggle(id)} />
    </>
}



