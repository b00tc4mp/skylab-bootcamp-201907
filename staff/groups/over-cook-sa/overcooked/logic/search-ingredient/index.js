/** 
 * Its a search method that 
 * accesses the API to be able to search meals 
 * through their ingredients
 * 
 * @param {string} id       - identifier
 * @param {string} token    - key to verify user
 * @param {string} query    - is a parameter to look for meal through ingredient
 * 
 */

logic.searchIngredient = function (id, token, query) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
            

                favorites = response.data.favorites
                return call(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`, 'get', undefined, undefined)
                .then(items => {
                    
                    const { meals } = items

                    if (meals === null) return []
                        else {
                        
                            favorites && meals.forEach(meal => meal.favorite = favorites.includes(meal.idMeal))

                            return meals
                        }
                    })
            })
    }
}
