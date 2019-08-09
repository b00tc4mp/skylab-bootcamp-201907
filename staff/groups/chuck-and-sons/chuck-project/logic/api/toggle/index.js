/**
 * Toggles { favorite } on the current joke 
 * Updates { favorites } propety on the current user
 *
 * @param {String} user id.
 * @param {String} user token.
 * @param {String} joke id.
 * 
 * @throws {Error} When user API doesn't retrieve any user.
 * @throws {Error} When user API doesn't retrieve credentials.
 * @throws {Error} When data API doesn't retrieve the current joke.
 */


logic.toggleFavoriteItem = function (id, token, idItem) {
    validate.str(id, 'id')
    validate.str(token, 'token')
    validate.str(idItem, 'idItem')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}`, undefined })
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)

            const favorites = response.data.favorites
            console.log(favorites, "favorites before")
            const index = favorites.findIndex(favorite => favorite === idItem)

            if (index > -1) {
                favorites.splice(index, 1)

                return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })

                    .then(response => {
                        if (response.status === 'KO') throw Error(response.error)
                        console.log(favorites, "favorites deleted after ")
                        return response
                    })
            } else {
                return call(`https://api.chucknorris.io/jokes/${idItem}`, 'get', undefined, undefined)
                    .then(joke => {
                        if (joke.error === "Not Found") throw new Error(joke.error)

                        favorites.push(joke.id)
                        console.log(favorites, "favorites added after ")

                        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                            .then(response => {
                                if (response.status === 'KO') expression(new Error(response.error))
                                return response
                            })
                    })
            }
        })
}