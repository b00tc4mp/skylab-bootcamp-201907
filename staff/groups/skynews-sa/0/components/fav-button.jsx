function FavButton({active, onToggle}){
  return <button onClick={event =>{
    event.stopPropagation()

    onToggle()
    
  }} >
  {console.log(active)}
    {active?
    <i className="far fa-2x fa-star"></i>:<i className="fas fa-2x fa-star"></i>}
  </button>
}