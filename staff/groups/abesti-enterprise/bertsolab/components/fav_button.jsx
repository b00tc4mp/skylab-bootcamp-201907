function FavButton({ active, onToggle }) {
    return <button className="fav-button" onClick={event => {

        onToggle()
    }}>{active ? '❤' : '🖤'}</button>
}