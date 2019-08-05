{
    describe('logic - retrieve random recipe', () => {

        it('Should return recipe data', () => {
            return logic.retrieveRandomRecipe()
                .then(meal => {
           
                    expect(meal.idMeal).toBeDefined()
                    expect(meal.strMeal).toBeDefined()
                    expect(meal.strCategory).toBeDefined()
                    expect(meal.strArea).toBeDefined()
                    expect(meal.strMealThumb).toBeDefined()
                    expect(meal.strYoutube).toBeDefined()
                })
        })

        
    })
}
