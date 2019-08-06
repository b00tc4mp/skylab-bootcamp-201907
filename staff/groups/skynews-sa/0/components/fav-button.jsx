function FavButton({active, onToggle}){
  return <button onClick={event =>{
    event.preventDefault()

    onToggle()
  }} >
    {active?
    <i className="fa fa-star"></i>:<i className='fas fa-star'></i>}
  </button>
}