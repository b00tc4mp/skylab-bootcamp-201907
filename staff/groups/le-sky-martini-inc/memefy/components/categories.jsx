function Categories(props) {
    return <>
<ul>
        <li> <a href="" onClick={event => {
            event.preventDefault()
            props.onClickCatCats()
            }}>Cats</a> </li>

         <li> <a href="" onClick={event => {
            event.preventDefault()
            props.onClickCatDogs()
            }}>Dogs</a> </li>

         <li> <a href="" onClick={event => {
            event.preventDefault()
            props.onClickCatAnimals()
            }}>Animals</a> </li>

         <li> <a href="" onClick={event => {
            event.preventDefault()
            props.onClickCatBabies()
            }}>Babies</a> </li>

         <li> <a href="" onClick={event => {
            event.preventDefault()
            props.onClickCatMorning()
            }}>Morning</a> </li>

         <li> <a href="" onClick={event => {
            event.preventDefault()
            props.onClickCatCelebrate()
            }}>Celebrate</a> </li>

         <li> <a href="" onClick={event => {
            event.preventDefault()
            props.onClickCatThink()
            }}>Think</a> </li>  
    </ul>

    </>
}