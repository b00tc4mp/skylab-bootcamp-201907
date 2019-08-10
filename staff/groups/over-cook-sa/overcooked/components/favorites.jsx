function Favorites(props) {
    
    return <section className="favorites">
    <ul>
         {props.favs.map( meal => 
             <li key={meal.idMeal} onClick={ () => {
                 props.onMeal(meal.idMeal)
             }} >
                 {props.paintMeal(meal)}
             </li>)
         }
     </ul>
     </section>  
 }