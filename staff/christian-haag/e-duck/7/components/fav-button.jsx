function FavButton({ active, onToggle }) {
    return <button onClick={event => {
        event.stopPropagation()

        onToggle()
    }}>{active ? '💜' : '💔'}</button>
}