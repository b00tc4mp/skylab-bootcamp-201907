function FavButton({ active, onToggle, trackId }) {
    return <button onClick={event => {
        event.preventDefault()
        onToggle(trackId)
    }}>{active ? '❤' : '🖤'}</button>
}