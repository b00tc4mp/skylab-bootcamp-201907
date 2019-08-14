function FavButton({active, onToggle}){
    return <button onClick={event =>{
        event.stopPropagation()
        onToggle()
    }}>{active? '❤️':'Add to Favs'}</button>
}

