function FavButton(props) {
    const { active, onToggle, id } = props
    return <button onClick={event => {
        event.stopPropagation()

        onToggle(id)
    }}>{active ? 'un-fav' : 'fav'}</button>
}
