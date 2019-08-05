logic.searchMovies = function(userId, userToken, query) {
    let API_KEY = '03ecceac5993bcd054fbc7d617df741a'

    if (userId != undefined && userToken != undefined) {
    } else {
        return call(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`, 'get', undefined, undefined)
        .then(response => {
            if (response.errors) throw Error('Search keyword must be provided.')
            if (!response.results.length) throw Error(`There are no results for query: ${query}`)
            return response.results
        })
    }

}