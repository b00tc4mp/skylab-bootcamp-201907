function DuckDetail({ duck: { title, imageUrl, price, description, link }, onBack }) {
    return <>
        <h3>{title}</h3>
        <FavButton active = { favorite } onToggle={() => onToggle(id)} />
        <img src={imageUrl} />
        <span>{price}</span>
        <p>{description}</p>
        <a href={link}>Go to store</a>
        <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}