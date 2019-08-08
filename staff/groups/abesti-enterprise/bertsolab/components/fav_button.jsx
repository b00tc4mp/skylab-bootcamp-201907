
function FavButton({ active, onToggle, trackId }) {
    return <button className="fav-button" onClick={event => {
        event.preventDefault()
        onToggle(trackId)
    }}>{active ? '❤' : '🖤'}</button>
}