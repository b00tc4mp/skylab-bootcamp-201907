function DuckDetail({ duck: { title, imageUrl, price, description, link, id }, onBack }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <button onClick={event => {
            event.preventDefault();
            users[0].favorites.push(id)
        }}>Favourite</button>
        <span>{price}</span>
        <p>{description}</p>
        <a href={link}>Go to store</a>
        <span>   </span>
        <a href="" onClick={event => {
            event.preventDefault()
            onBack()
        }}>Go back</a>

    </>
}