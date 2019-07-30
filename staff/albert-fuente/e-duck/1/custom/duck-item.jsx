

function DuckItem({ duck: { title, imageUrl, price } }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
    </>
}



/* li.addEventListener('click', event => {
    event.preventDefault()

    this.onClickItem(duck.id)
}) */