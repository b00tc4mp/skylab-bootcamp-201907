function RecipeItem ( { meal: { strMeal, strYoutube } } ) {
    return <>

    <section className="random-content">
        <h2 className="random-recipe">Random Recipe</h2>        
        <iframe className="random-recipe recipe-video" src={strYoutube}></iframe>   
        <h3 className="random-recipe recipe-title">{strMeal}</h3>
    </section> 
    </>
}