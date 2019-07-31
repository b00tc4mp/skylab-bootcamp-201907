function DuckItem(props)  {

    const {duck: { title, imageUrl, price, id }} = props
    const {loggedUser} = props
    
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
         <button onClick={ event  => {
            event.stopPropagation()
            {loggedUser && 
            props.onFavorite(id)}
            {!loggedUser && 
            props.loginRedirection()}
        }}>Add Favorite</button> 
    </>
}

