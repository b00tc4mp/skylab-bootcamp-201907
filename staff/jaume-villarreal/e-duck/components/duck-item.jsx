function DuckItem(props) {

    const { duck: { title, imageUrl, price , id} } = props

    return <div>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
    </div>
}