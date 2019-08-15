function FavButton({active, onToggle}){
  return <button onClick={event =>{
    event.stopPropagation()

    onToggle()
    
  }} >
  {console.log(active)}
    {active?
    <i className="star fas fa-2x fa-star"></i>:<i className="star far fa-2x fa-star"></i>}
  </button>
}