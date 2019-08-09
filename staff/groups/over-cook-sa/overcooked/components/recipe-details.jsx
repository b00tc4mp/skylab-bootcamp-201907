function RecipeDetails({ meal: { idMeal, strMeal, strInstructions, strYoutube, strMealThumb, favorite }, ingredients, onBack, onToggle }) {
    return <div className='wrapper'>
        <h3 className="wrapper__title">{strMeal}</h3> 
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />

        <img className='wrapper__img' src={strMealThumb} alt=""/>
        
        <h2 className="ingredients-title">INGREDIENTS</h2>

        <ul className="ingredients-cont">
            {ingredients.map((ingredient, index) => {
                
                return <li className='ingredients-cont__ingredients' key={index}>
            {<h4>{ingredient.ingredientName}</h4>}
            {<p>{ingredient.measure}</p>}
                </li>

            })}
        </ul>
       

        <p className='descText'>{strInstructions}</p>

        <iframe className="recipe-video" src={strYoutube}></iframe>

        <a className='btnGo' href={strYoutube} target="_blank" >VIDEO</a>

        <a className='backButton' href="#" onClick={ event => {
            event.preventDefault()
            onBack()
        }} >Go Back</a>
    </div>
}