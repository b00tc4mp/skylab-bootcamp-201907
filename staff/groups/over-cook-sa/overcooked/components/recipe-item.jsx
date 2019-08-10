function RecipeItem ( { meal: { strMeal, strYoutube } } ) {
    
    return <>

    <section className="random-content">
        <h2 className="random-content__recipe">Random Recipe</h2>        
        <iframe className="recipe-video" src={strYoutube}></iframe>   

    </section> 
    </>
}