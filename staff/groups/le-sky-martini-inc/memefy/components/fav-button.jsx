function FavButton({ active, onToggle }) {
    return <button className={`results__favorites`} onClick={event => {
        event.stopPropagation()

        onToggle()
    }}>{active ? '💜' : '💔'}</button>
}