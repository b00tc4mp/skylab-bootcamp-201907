/**
 * 
 * Search movies using TMDB API and returns movie results. If userID and userToken is provided, results are enriched with favorites data.
 * @params {string} userID
 * @params {string} userToken
 * @params {string} query
 * 
 */
logic.searchMovies = function(userId, userToken, query, collections = false) {
    let API_KEY = '03ecceac5993bcd054fbc7d617df741a'


    if (userId != undefined && userToken != undefined) {
        validate.string(userId, 'id')
        validate.string(userToken, 'token')
        validate.string(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${userId}`, 'get', { 'authorization': `bearer ${userToken}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                favorites = response.data.favorites

                return call(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`, 'get', undefined, undefined)
                    .then(response => {
                        if (response.error) return []
                        else {
                            let movies = response.results
                            favorites && movies.forEach(movie => movie.favorite = favorites.includes(movie.id))

                            return movies
                        }
                    })
            }) 
    } else {
        return call(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`, 'get', undefined, undefined)
        .then(response => {
            if (response.errors) throw Error('Search keyword must be provided.')
            if (!response.results.length) throw Error(`There are no results for query: ${query}`)
            return response.results
        })
    }

}