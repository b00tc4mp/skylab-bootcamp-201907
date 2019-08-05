logic.searchJokes = function (id, token, query) {
    let favorites;

    if (id !== undefined && token !== undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer: ${token}` }, undefined)
            .then(response => {
                if (response.error === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.chucknorris.io/jokes/search?query=${query}`, 'get', undefined, undefined)
                    .then(jokes => {
                        if (jokes.error) return []
                        else {
                            favorites && jokes.result.forEach(joke => joke.favorite = favorites.includes(joke.id))

                            return jokes
                        }
                    })
            })
    } else {
        validate.string(query, 'query', false)
        return call(`https://api.chucknorris.io/jokes/search?query=${query}`, 'get', undefined, undefined)
            .then(jokes => {
                if (jokes.error) return []

                favorites && jokes.result.forEach(joke => joke.favorite = favorites.includes(joke.id))

                return jokes
            })
    }
}