/** 
 * Its alows us to acces the Skylabcoders users API 
 * to add and delete favorites (we save the meals through theyr ids)
 * 
 * @param {string} id       - identifier
 * @param {string} token    - key to verify user
 * @param {string} idMeal   - identifier of the meal
 * 
 */

logic.toggleFavMeal = function (id, token, idMeal) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(idMeal, 'idMeal')

    return call (`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
        
            const favorites = response.data.favorites

            const index = favorites.findIndex(favorite => favorite === idMeal)

            if (index > -1) {
                favorites.splice(index, 1)

                return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
            } else
                return call('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal, undefined, undefined, undefined)
                    .then(meal => {
                        if (meal.error) throw new Error(meal.error)

                        favorites.push(idMeal)

                        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                            .then(response => {
                                if (response.status === 'KO') expression(new Error(response.error))
                            })
                    })
        })

}