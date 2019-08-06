logic.toggleFavMovie = function(userId, userToken, movieId, expression) {
    const TMDB_API_KEY = '03ecceac5993bcd054fbc7d617df741a'
    const AUTH_ENDPOINT = 'https://skylabcoders.herokuapp.com/api/user/'

    //Input Validation
    validate.string(userId, 'id')
    validate.string(userToken, 'token')
    validate.string(movieId, 'movie id')

    /* Call retrieve user endpoint to extract their favorites */
    return call(`${AUTH_ENDPOINT}${userId}`, 'get', {'authorization': `bearer ${userToken}`}, undefined)
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)
            const favorites = response.data.favorites

            const index
            (favorites) ? index = favorites.findIndex(favId => favId === movieId) : favorites = []

            /* means movie has been found in user's favorites, remove from it */
            if (favorites && index > -1) {

                favorites.splice(index, 1)

                return call(
                    `https://skylabcoders.herokuapp.com/api/user/${userId}`,
                    'put',
                    {'content-type': 'application/json', 'authorization': `bearer ${userToken}`},
                    {favorites})
                    .then(response => {
                        if (response.status === 'KO') throw Error(response.error)
                        expression()
                    })
            } else {
                /* Check if movie is still accessible */
                 return call(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${TMDB_API_KEY}`, 'get', undefined, undefined)
                    .then(movie => { 
                        favorites.push(movie.id.toString())

                        /* Update user favorites on the database */
                        return call(
                            `https://skylabcoders.herokuapp.com/api/user/${userId}`,
                            'put',
                            {'content-type': 'application/json', 'authorization': `bearer ${userToken}`},
                            {favorites: favorites})
                            .then(response => {
                                if (response.status === 'KO') throw Error(response.error)
                                expression()
                            })
                    })
            }
        })
    }
