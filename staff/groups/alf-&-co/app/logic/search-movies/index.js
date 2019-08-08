/**
 * 
 * Search movies and collections (by genre) using TMDB API and returns movie results. If userID and userToken is provided, results are enriched with favorites data.
 * If collections is true, the endpoint url changes and goes to the movies of the chosen collections
 * @params {string} userID
 * @params {string} userToken
 * @params {string} query
 * @params {boolean} collections
 * 
 */

logic.searchMovies = function(userId, userToken, query, collections=false) {
    let API_KEY = '03ecceac5993bcd054fbc7d617df741a'
    let url
    
    if (collections) url=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${query}`
    else url= `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    

    if (userId != undefined && userToken != undefined)  {
        validate.string(userId, 'id')
        validate.string(userToken, 'token')
        validate.string(query, 'query')

        return call(`https://skylabcoders.herokuapp.com/api/user/${userId}`, 'get', { 'authorization': `bearer ${userToken}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                favorites = response.data.favorites

                return call(url, 'get', undefined, undefined)
                    .then(response => {
                        if (response.error) return []
                        else {
                            let movies = response.results
                            favorites && movies.forEach(movie => movie.favorite = favorites.includes(movie.id.toString()))

                            return movies
                        }
                    })
            }) 
    } else {
        return call(url, 'get', undefined, undefined)
        .then(response => {
            if (response.errors && collections===false) throw Error('Search keyword must be provided.')
            
            if (!response.results.length && collections===false) throw Error(`There are no results for query: ${query}`)
            if (!response.results.length) throw Error(`There are no results for this collection: ${query}`)
            return response.results
        })
    }

}