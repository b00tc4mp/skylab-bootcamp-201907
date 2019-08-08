function RecipeItem2 ( { meal: { idMeal, strMeal, strMealThumb, favorite}, onToggle } ) {
    return <div className='wrapper'>

        <h3>{strMeal}</h3>
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img className='img' src={strMealThumb} alt=""/>

    </div>
}