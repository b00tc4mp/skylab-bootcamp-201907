function FavButton(props) {
    const { active, onToggle, id } = props
    return <button className="fav-button" onClick={event => {
        event.stopPropagation()

        onToggle(id)
    }}>{active ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}</button>
}
