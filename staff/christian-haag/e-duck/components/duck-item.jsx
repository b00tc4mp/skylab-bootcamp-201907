function DuckItem(props) {
    const { duck: { title, imageUrl, price, id } } = props
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
    </>
}