function RecipeDetails({ meal: { idMeal, strMeal, strInstructions, strYoutube, strMealThumb, favorite }, onBack, onToggle }) {
    return <>
        <h3>{strMeal}</h3> 
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img src={strMealThumb}/>
        <p>{strInstructions}</p>
        <a href={strYoutube}></a>

        <a href="#" onClick={ event => {
            event.preventDefault()
            onBack()
        }} >Go Back</a>
    </>
}