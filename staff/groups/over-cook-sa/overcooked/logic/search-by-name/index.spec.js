{
    describe('logic - search by name', () => {
        // let query = 'Arrabiata'

        it('should return recipe data on correct query', () => {
            let query = 'Arrabiata'
            return logic.searchByName(query)
                .then(meals => {
                    expect(meals[0].idMeal).toBeDefined()
                    expect(meals[0].strMeal).toBeDefined()
                })
        })

        it('should return null on unknown query', () => {
            let query = '42fsafd3fr3e'
            return logic.searchByName(query)
                .catch(error =>
                    expect(error.message).toBe('No meals found'))
        })
    })
}