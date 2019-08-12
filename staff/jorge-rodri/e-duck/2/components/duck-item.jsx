function DuckItem({ duck: { id, title, imageUrl, price, favorite }, user, onToggle }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <FavButton active={favorite} onToggle={() => user ? logic.toggleFavDuck(user, id, onToggle) : onToggle()} />
    </>
}