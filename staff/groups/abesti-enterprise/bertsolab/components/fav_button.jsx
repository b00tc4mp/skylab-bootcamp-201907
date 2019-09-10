/**
* Button Favorite Song.
*/

function FavButton({ active, onToggle, trackId }) {
    return <button className="fav-button" onClick={event => {
        event.preventDefault()
        onToggle(trackId)
    }}>{active ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}</button>
}