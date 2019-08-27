/**
 * We retrive the recipes through the identifiers 
 * to be able to look if they are in favorites
 * 
 * @param {string} id       - identifier
 * @param {string} token    - key to verify user
 * @param {string} recipeId - recipe identifier
 * 
 */

logic.retrieveRecipe = function (id, token, recipeId) {
    let favorites

    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(recipeId, 'recipe id')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', {
            'authorization': `bearer ${token}`
        }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            favorites = response.data.favorites

            return call(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`, 'get', undefined, undefined)
                .then(response => {
                    const {
                        meals
                    } = response

                    if (meals === null) throw new Error('No meals found')

                    favorites && (meals[0].favorite = favorites.includes(recipeId))

                    return meals[0]
                })
        })

}