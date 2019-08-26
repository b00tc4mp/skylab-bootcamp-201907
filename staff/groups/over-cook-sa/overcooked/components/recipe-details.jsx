function RecipeDetails({ meal: { idMeal, strMeal, strInstructions, strYoutube, strMealThumb, favorite }, ingredients, onBack, onToggle }) {
    

    const youtube = strYoutube.split("=")  
    const youtubeLink = 'https://www.youtube.com/embed/'+youtube[1]
    

   return <section className='wrapper_cont'>
   
        <div className='main__res'>
        <h3 className="main__res__title">{strMeal}</h3> 
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />

        <img className='main__res__img' src={strMealThumb} alt=""/>
        
        <h2 className="main__res__title">INGREDIENTS</h2>

        <ul className="main__res__ul">
            {ingredients.map((ingredient, index) => {
                
                return <li className='main__res__list' key={index}>
            {<h4>{ingredient.ingredientName}</h4>}
            {<p>{ingredient.measure}</p>}
                </li>

            })}
        </ul>
    
        <p className='main__res__text'>{strInstructions}</p>
        
        <iframe className="main__res__video" src={youtubeLink}></iframe>

        <a className='main__res__a' href={strYoutube} target="_blank" >VIDEO</a>

        <a className='main__res__buttom' href="#" onClick={ event => {
            event.preventDefault()
            onBack()
        }} >Go Back</a>
    </div>
    </section>
}