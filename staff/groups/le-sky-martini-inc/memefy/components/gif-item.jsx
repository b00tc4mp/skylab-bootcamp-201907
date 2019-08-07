function GifItem({ gif: { id, title, images, favorite }, onToggle }) {
    return <>
        <h3>{title}</h3>
        <img className={`results__image`} src={images.downsized_large.url} />
        <FavButton active={favorite} onToggle={() => onToggle(id)} />
    </>
}



