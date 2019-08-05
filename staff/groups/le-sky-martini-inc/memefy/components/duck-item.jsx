function DuckItem({ duck: { id, title, images, favorite }, onToggle }) {
    return <>
        <h3>{title}</h3>
        <img src={images.downsized_large.url} />
        <span>{id}</span>
        <FavButton active={favorite} onToggle={() => onToggle(id)} />
    </>
}



