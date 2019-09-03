/**
 * It allows a registered user to add or remove favorite GIFs.
 * It checks whether the GIF id already exists in the favorites section. If it does, the function removes it; if it doesn't, the function adds it.
 * If the validations go wrong, it shows a message with the response error.
 * 
 * @param {String} id The user id.
 * @param {String} token The token to authorize user validation.
 * @param {String} gifid The GIF id.
 * 
 * @return {Object} Response on the process and modified favorites array.
 */


logic.toggleFavGif = function (id, token, gifId) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(gifId, 'gif id')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            const index = favorites.findIndex(favorite => favorite === gifId)

            if (index > -1) {
                favorites.splice(index, 1)

                return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
            } else
                return call(`https://api.giphy.com/v1/gifs/${gifId}?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
                    .then(gif => {
                        if (gif.error) throw new Error(gif.error)

                        favorites.push(gifId)

                        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                            .then(response => {
                                if (response.status === 'KO') expression(new Error(response.error))
                            })
                    })
        })
}