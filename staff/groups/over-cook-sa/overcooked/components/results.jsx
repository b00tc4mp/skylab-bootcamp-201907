function Results(props) {
   return <ul>
        {props.meals.map( meal => 
            <li key={meal.idMeal} onClick={ () => {
                props.onMeal(meal.idMeal)
            }} >
                {props.paintMeal(meal)}
            </li>)
        }
   </ul>
}