/**
 * Retrieves categories from data API
 * 
 * @throws {TypeError} When no results from API.
 * 
 * @returns {Array} A new array with categories.
 */


logic.getCategories = () => {

    return call(`https://api.chucknorris.io/jokes/categories`, 'get', undefined, undefined)
        .then(categories => {
            if (categories.error) return []

            return categories
        })
}