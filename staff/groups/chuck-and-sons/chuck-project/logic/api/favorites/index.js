/**
 * Retrieves user favorites 
 *
 * @param {String} user id.
 * @param {String} user token.
 * 
 * @throws {Error} When user API doesn't retrieve any user.
 * @throws {Error} When data API doesn't retrieve a joke.
 * 
 * @returns {Array} An array with favorite jokes.
 */

logic.getFavoriteJokes = (id, token) => {
    validate.str(id, 'id')
    validate.str(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer: ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            const prom = favorites.map(id =>
                call(`https://bypasscors.herokuapp.com/api/?url=http://api.chucknorris.io/jokes/${id}`, 'get', undefined, undefined)
                    .then(res => {
                        if (res.error) throw new Error(res.error)
                        else return res
                    })
                    .then(joke => (joke.favorite = true) && joke)
            )
            return Promise.all(prom)

        })

}