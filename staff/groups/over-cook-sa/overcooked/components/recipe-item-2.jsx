function RecipeItem2 ( { meal: { idMeal, strMeal, strMealThumb, favorite}, onToggle } ) {
    return <div className='main__res'>

        <h3 className="main__res__title">{strMeal}</h3>
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img className='main__res__img' src={strMealThumb} alt=""/>

    </div>
}