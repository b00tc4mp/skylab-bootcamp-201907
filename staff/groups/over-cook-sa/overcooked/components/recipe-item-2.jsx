function RecipeItem2 ( { meal: { strMeal, strMealThumb } } ) {
    return <>
        <h3>{strMeal}</h3>
        <img src={strMealThumb} alt=""/>
        
    </>
}