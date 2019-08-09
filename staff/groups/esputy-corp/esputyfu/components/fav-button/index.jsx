function FavButton({ active, onToggle }) {
    return <button className='button__fav'onClick={event => {
        event.stopPropagation()
        
        onToggle()
    }}>{active ? <i class="fa fa-heart" aria-hidden="true"></i> : <i class="fa fa-heart-o" aria-hidden="true"></i>  }</button>
}