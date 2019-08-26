function Favorites(props) {
    
    return <ul className="main__res__ul">
         {props.favs.map( meal => 
             <li className="main__res__list" key={meal.idMeal} onClick={ () => {
                 props.onMeal(meal.idMeal)
             }} >
                 {props.paintMeal(meal)}
             </li>)
         }
     </ul>  
 }