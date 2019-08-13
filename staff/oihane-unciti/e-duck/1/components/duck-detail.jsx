function DuckDetail({ duck: { title, imageUrl, price, description, link, id }, onBack }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <p>{description}</p>
        <a href={link}>Go to store</a>
        <button onClick={event => {
            debugger
            addToFavourite(id)
        } }>❤</button>
        <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}