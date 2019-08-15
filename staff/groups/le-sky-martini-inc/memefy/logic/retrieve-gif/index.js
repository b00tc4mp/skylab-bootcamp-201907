/**
 * Retrieves GIF via Giphy API. 
 * If the user is registered it checks his/her id+token and allows him/her to save desired GIFs to a favorites array/section.
 * If the validations goes wrong, it shows a message with the response error.
 * 
 * @param {String} id The user id.
 * @param {String} token The token to authorize user validation.
 * @param {String} gifid The GIF id.
 * 
 * @return {Object} GIF object with different properties. 
 */

logic.retrieveGif = function (id, token, gifId) {
    let favorites = []

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(gifId, 'gif id')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.giphy.com/v1/gifs/${gifId}?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, 'get', undefined, undefined)

                    .then(gif => {
                        if (gif.error) throw new Error(gif.error)

                        favorites && (gif.favorite = favorites.includes(gifId))

                        return gif
                        
                    })
                    
                    
            })
    } else {
        validate.string(gifId, 'gif id')

        return call(`https://api.giphy.com/v1/gifs/${gifId}?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
            
            .then(gif => {
                if (gif.error) throw new Error(gif.error)

                return gif
            })
            
    }
}


