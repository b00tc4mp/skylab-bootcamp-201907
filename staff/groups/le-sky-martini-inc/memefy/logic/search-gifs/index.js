/**
 * Searches GIF via Giphy API with an introduced query. 
 * If the user is registered it checks his/her id+token and allows him/her to save desired GIFs to a favorites array/section.
 * If the validation of user/query information goes wrong, it shows a message with the response error.
 * 
 * @param {String} id The user id.
 * @param {String} token The token to authorize user validation.
 * @param {String} query The query introduced in the search bar.
 * 
 * @return {Object} GIF object with different properties.
 */

logic.searchGifs = function (id, token, query) {
    let favorites = []

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=${query}`, 'get', undefined, undefined)
                    .then(res => res.data)
                    .then(gifs => {
                        if (gifs.error) return []
                        else {
                            favorites && gifs.forEach(gif => gif.favorite = favorites.includes(gif.id))
                            
                            return gifs
                        }
                    })
                    .then(randomGifs => {
                        if (randomGifs.error) return []
                        else {
                            return randomGifs
                        }
                    })
            }) 
    } else {
        validate.string(query, 'query', false)

        return call(`https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=${query}`, 'get', undefined, undefined)
            .then(res => res.data)
            .then(gifs => {
            
                if (gifs.error) return []

                favorites && gifs.forEach(gif => gif.favorite = favorites.includes(gif.id))
                return gifs
            })
            .then(randomGifs => {
            
                if (randomGifs.error) return []
                else {
                    return randomGifs
                }
            })
    }
}