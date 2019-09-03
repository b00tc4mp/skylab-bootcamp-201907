function FavButton({ active, onToggle }) {
    return <button className='button__fav'onClick={event => {
        event.stopPropagation()
        
        onToggle()
    }}>{active ? <i className="fa fa-heart" aria-hidden="true"></i> : <i className="fa fa-heart-o" aria-hidden="true"></i>  }</button>
}