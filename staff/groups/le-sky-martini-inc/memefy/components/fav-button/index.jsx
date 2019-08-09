/**
 * Button to mark an item as favorite.
 */
​
function FavButton({ active, onToggle }) {
    return <button className={`results__favorites`} onClick={event => {
        event.stopPropagation()

        onToggle()
    }}>{active ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}</button>
}