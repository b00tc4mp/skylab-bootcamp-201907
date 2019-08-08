function RecipeItem2 ( { meal: { idMeal, strMeal, strMealThumb, favorite}, onToggle } ) {
    return <>
        <h3>{strMeal}</h3>
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img src={strMealThumb} alt=""/>

    </>
}