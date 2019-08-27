/** 
 * Its a search method that 
 * accesses the API to be able to search meals 
 * through their names
 * 
 * @param {string} id       - identifier
 * @param {string} token    - key to verify user
 * @param {string} name     - is a parameter to look for meal through the name
 * 
 */

logic.searchByName = function (id, token, name) {

    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(name, 'name')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', {
                'authorization': `bearer ${token}`
            }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`, 'get', undefined, undefined)
                    .then(response => {
                        if (response.meals === null) throw new Error('No meals found')
                        else {
                            favorites && response.meals.forEach(meal => meal.favorite = favorites.includes(meal.idMeal))

                            
                            return response.meals
                        }
                    })
            })
    }
}