
/**
 * cocktailApi API
 * 
 * @version 0.0.1
 */

const cocktailApi = {

    url: 'https://www.thecocktaildb.com/api/json/v1/1',

    /**
     * 
     * Method to search Cocktails
     * 
     * @param {string} query  - Cocktail to be found.
     * 
     * @throws {TypeError} - If query is not a string.
     * @throws {Error} - If query is empty.
     * @throws {Error} - If no Cocktail match.
     * 
     * @returns {Object} - With Cocktail info
     */

    searchCocktails(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return fetch(`${this.url}/search.php?s=${query}`)
            .then(response => response.json())

            .then(response => {
                const { drinks } = response
                if (!drinks) throw Error('No Cocktails found')
                return drinks
            })
    },

    /**
 * 
 * Method to search Cocktails
 * 
 * @returns {Object} - With Cocktail info
 * 
 */

    randomCocktail() {
        return fetch(`${this.url}/random.php`)
            .then(response => response.json())
            .then(response => {
                if (response.drinks.length < 1) throw Error('No Cocktail found')

                const { drinks: [drink] } = response

                return drink
            })
    }
}

export default cocktailApi