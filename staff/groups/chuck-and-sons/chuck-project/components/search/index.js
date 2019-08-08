logic.searchJokes = function (id, token, query) {
    let favorites;

    if (id !== undefined && token !== undefined) {
        validate.str(id, 'id')
        validate.str(token, 'token')
        validate.str(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer: ${token}` }, undefined)
            .then(response => {
                if (response.error === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.chucknorris.io/jokes/search?query=${query}`, 'get', undefined, undefined)
                    .then(jokes => {
                        if (jokes.error) return []
                        else {
                            if (jokes.total > 30) {
                                const jokeSelection = jokes.result.splice(15)
                                favorites && jokes.result.forEach(joke => joke.favorite = favorites.includes(joke.id))
                                return jokes
                            } else {

                                return jokes
                            }
                        }
                    })
            })
    } else {
        validate.str(query, 'query', false)
        return call(`https://api.chucknorris.io/jokes/search?query=${query}`, 'get', undefined, undefined)
            .then(jokes => {
                if (jokes.error) return []
                else {
                    if (jokes.total > 30) {
                        const jokeSelection = jokes.result.splice(15)
                        favorites && jokes.result.forEach(joke => joke.favorite = favorites.includes(joke.id))
                        return jokes
                    } else {

                        return jokes
                    }
                }
            })
    }
}