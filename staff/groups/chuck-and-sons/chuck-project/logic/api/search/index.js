/**
 * Retrieves jokes depending on a query 
 *
 * @param {String} user id.
 * @param {String} user token.
 * @param {String} query search.
 * 
 * @throws {Error} When user API doesn't retrieve any user.
 * 
 * @returns {Array} An array with jokes.
 */

logic.searchJokes = function (id, token, query) {
    let favorites;
    console.log(id, token)
    if (id !== undefined && token !== undefined) {
        validate.str(id, 'id')
        validate.str(token, 'token')
        validate.str(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer: ${token}` }, undefined)
            .then(response => {
                if (response.error === 'KO') throw new Error(response.error)

                console.log("hola")
                favorites = response.data.favorites

                return call(`https://api.chucknorris.io/jokes/search?query=${query}`, 'get', undefined, undefined)
                    .then(jokes => {
                        if (jokes.error) jokes = []
                        else if (jokes.total > 30) {
                            jokes.result.splice(15)
                        }
                        console.log(favorites, 'favorites')
                        console.log(jokes.result, 'jokes.result')
                        favorites && jokes.result.forEach(joke => joke.favorite = favorites.includes(joke.id))
                        return jokes
                    })
            })
    } else {
        validate.str(query, 'query', false)
        return call(`https://api.chucknorris.io/jokes/search?query=${query}`, 'get', undefined, undefined)
            .then(jokes => {
                if (jokes.error) jokes = []
                else if (jokes.total > 30) {
                    jokes.result.splice(15)
                }
                favorites && jokes.result.forEach(joke => joke.favorite = favorites.includes(joke.id))
                return jokes
            })

    }
}