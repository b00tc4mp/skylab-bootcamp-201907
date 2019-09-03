function FavButton({ active, onToggle}) {
    return <>
     <p></p><button className="main__favbuttom" onClick={event => {
        event.stopPropagation()

            onToggle()
        
    }}>{active ? <i className="fas fa-lemon"></i> : <i className="far fa-lemon"></i>} </button>
    </>
}