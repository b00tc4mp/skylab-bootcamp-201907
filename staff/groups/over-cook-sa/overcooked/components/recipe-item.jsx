function RecipeItem ( { meal: { strMeal, strYoutube } } ) {
    
    return <>

        <section className="main__random-section">
            <h2 className="main__random-section__title">Random Recipe</h2> 
            <h3 className="main__random-section__recipe">{strMeal}</h3>      
            <iframe className="main__random-section__video" src={strYoutube}></iframe>   
        </section>
    </>
}