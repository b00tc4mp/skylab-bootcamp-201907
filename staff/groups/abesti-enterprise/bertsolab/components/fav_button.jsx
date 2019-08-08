function FavButton({ active, onToggle }) {
    return <button onClick={event => {

        onToggle()
    }}>{active ? '❤' : '🖤'}</button>
}