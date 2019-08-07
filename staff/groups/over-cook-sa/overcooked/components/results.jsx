function Results(props) {
   return <ul>
        {props.meals.map( meal => 
            <li key={meal.idMeal} >
                {props.paintMeal(meal)}
            </li>)
        }
   </ul>
}