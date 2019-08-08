function FavButton({ active, onToggle}) {
    return <button onClick={event => {
        event.stopPropagation()

            onToggle()
        
    }}>{active ? <i className="fas fa-lemon"></i> : <i className="far fa-lemon"></i>} </button>

}