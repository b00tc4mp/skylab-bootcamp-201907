function DuckDetail({ duck: { title, imageUrl, price, description, link, id}, onBack }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <p>{description}</p>
        <a href={link}>Go to store</a>
        <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
        <button onClick={ event => {
            event.preventDefault()

            addFavs()
        }}>Add to favs</button>
    </>
}