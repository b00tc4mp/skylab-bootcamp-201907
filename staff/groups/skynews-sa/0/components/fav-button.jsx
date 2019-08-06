function FavButton({active, onToggle}){
  return <button onClick={event =>{
    event.stopPropagation()

    onToggle()
    
  }} >
  {console.log(active)}
    {active?
    ':corazón_púrpura:' : ':corazón_partido:'}
  </button>
}