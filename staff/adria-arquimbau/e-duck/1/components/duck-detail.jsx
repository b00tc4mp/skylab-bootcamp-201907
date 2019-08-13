
function DuckDetail({ duck: { title, imageUrl, price, description, link }, onBack }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <i className="far fa-heart" onClick={ event => {
            console.log('FAVORITOS')
        }} ></i>
        <p>{description}</p>
        <a href={link}>Go to store</a>
        <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}