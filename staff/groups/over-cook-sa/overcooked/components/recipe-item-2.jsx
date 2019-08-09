function RecipeItem2 ( { meal: { idMeal, strMeal, strMealThumb, favorite}, onToggle } ) {
    return <div className='wrapper'>

        <h3 className="wrapper__title">{strMeal}</h3>
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img className='wrapper__img' src={strMealThumb} alt=""/>

    </div>
}