/**
 * Throught the id and token we retrieve the user favorites through 
 * Skylabcoders users API
 * 
 * @param {string} id       - identifier
 * @param {string} token    - key to verify user
 * 
 */

logic.retrieveFavMeal = function (id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    
    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            const calls = favorites.map(idMeal =>
                call(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`, 'get', undefined, undefined)
                    .then(meal => (meal.meals[0].favorite = true) && meal)
            )
        
            return Promise.all(calls)
            .then(response => { 
                
                return response.map(element => {
                    const { meals : [ meal ] } = element
                    return meal
                })          
            })
    })
}