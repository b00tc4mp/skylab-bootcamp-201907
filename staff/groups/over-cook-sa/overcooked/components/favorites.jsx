function Favorites(props) {
    
    return<ul>
         {props.favs.map( meal => 
             <li key={meal.idMeal} onClick={ () => {
                 props.onMeal(meal.idMeal)
             }} >
                 {props.paintMeal(meal)}
             </li>)
         }
     </ul>
     
 }