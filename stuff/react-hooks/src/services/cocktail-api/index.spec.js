import cocktailApi from './index'

/**
 * 
 * Cocktail-API Testing
 * 
 */

describe('theCocktailDb api testing', () => {

    describe('search cocktail', () => {

        let query = 'Margarita'

        it('should fail on empty query', () => {
            expect(() => cocktailApi.searchCocktails('')).toThrowError('query is empty')
        })

        it('should fail when query is a number', () => {
            expect(() => cocktailApi.searchCocktails(1)).toThrowError(`1 is not a string`)
        })

        it('should fail when query is a boolean', () => {
            expect(() => cocktailApi.searchCocktails(true)).toThrowError(`true is not a string`)
        })

        it('should fail when query is an array', () => {
            expect(() => cocktailApi.searchCocktails([1, 2, 3])).toThrowError(`1,2,3 is not a string`)
        })

        it('should get a cocktail on matching query', () => {
            return cocktailApi.searchCocktails(query).then(drinks => {
                expect(drinks).toBeDefined()
                expect(typeof drinks === 'object').toBeTruthy()
                const [margarita] = drinks
                expect(margarita.strDrink).toEqual(query)
            })
        })

        it('should fail on missmatching character', () =>
            cocktailApi.searchCocktails('12312313123').then(() => {
                throw Error('should not pass by here')
            })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toEqual(`No Cocktails found`)
                })
        )

    })

    describe('random cocktail', () => {
        it('should get a random cocktail', () =>
            cocktailApi.randomCocktail()
                .then(drink => {
                    expect(drink).toBeDefined()
                    expect(typeof drink === 'object').toBeTruthy()
                })
        )
    })
})

