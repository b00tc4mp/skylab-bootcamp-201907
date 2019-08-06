function DuckDetail({ duck: { id, title, imageUrl, price, description, link, favorite }, onBack, onToggle }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <FavButton active={favorite} onToggle={() => onToggle(id)}/>
        <p>{description}</p>
        <a href={link}>Go to store</a>
        {onBack && <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>}
    </>
}