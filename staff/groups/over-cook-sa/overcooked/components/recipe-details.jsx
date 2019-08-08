function RecipeDetails({ meal: { /**idMeal */strMeal, strInstructions, strYoutube, strMealThumb }, onBack, onToggle }) {
    return <>
        <h3>{strMeal}</h3> 
        <img src={strMealThumb}/>
        <p>{strInstructions}</p>
        <a href={strYoutube} target="_blank" >VIDEO</a>

        <a href="#" onClick={ event => {
            event.preventDefault()
            onBack()
        }} >Go Back</a>
    </>
}