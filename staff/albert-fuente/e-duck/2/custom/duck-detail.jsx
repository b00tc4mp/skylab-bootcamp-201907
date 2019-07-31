function DuckDetail({ duck: { title, imageUrl, price, description, link }, onBack, addFav }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <p>{description}</p>
        <button onClick={ event => {
            event.preventDefault()

            addFav(email,id)
        }}>Add to favourites</button>
        <a href={link}>Go to store</a>
        
        <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}