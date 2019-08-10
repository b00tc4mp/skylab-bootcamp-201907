function Results(props) {
    
   return<>
   <section className='wrapper_cont'>
    <ul>
            {props.meals.map( meal => 
                <li key={meal.idMeal} onClick={ () => {
                    props.onMeal(meal.idMeal)
                }} >
                    {props.paintMeal(meal)}
                </li>)
            }
        </ul>
    </section>
    </>
}