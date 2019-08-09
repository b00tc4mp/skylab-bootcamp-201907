/**
 * Category selector component.
 */

function Categories(props) {
    return <section className={`categories`}>
      <ul className={`categories__list`}>
         <li className={`categories__item`}> <a className={`categories__tag`} href="" onClick={event => {
               event.preventDefault()
               props.onClickCatCats()
               }}>Cats</a> 
         </li>

         <li className={`categories__item`}> <a className={`categories__tag`} href="" onClick={event => {
               event.preventDefault()
               props.onClickCatDogs()
               }}>Dogs</a> 
         </li>

         <li className={`categories__item`}> <a className={`categories__tag`} href="" onClick={event => {
               event.preventDefault()
               props.onClickCatAnimals()
               }}>Animals</a> 
         </li>

         <li className={`categories__item`}> <a className={`categories__tag`} href="" onClick={event => {
               event.preventDefault()
               props.onClickCatBabies()
               }}>Babies</a> 
         </li>

         <li className={`categories__item`}> <a className={`categories__tag`} href="" onClick={event => {
               event.preventDefault()
               props.onClickCatMorning()
               }}>Morning</a> 
         </li>

         <li className={`categories__item`}> <a className={`categories__tag`} href="" onClick={event => {
               event.preventDefault()
               props.onClickCatCelebrate()
               }}>Celebrate</a> 
         </li>

         <li className={`categories__item`}> <a className={`categories__tag`} href="" onClick={event => {
               event.preventDefault()
               props.onClickCatThink()
               }}>Think</a> 
         </li>  
      </ul>
    </section>
}