/**
 * It allows a registered user to add or remove favorite GIFs from random panel.
 * It checks whether the GIF id already exists in the favorites section. If it does, the function removes it; if it doesn't, the function adds it.
 * If the validations go wrong, it shows a message with the response error.
 * 
 * @param {String} id The user id.
 * @param {String} token The token to authorize user validation.
 * @param {String} gifid The GIF id.
 * 
 * @return {Object} Response on the process and modified favorites array.
 */



logic.randomGif = function (id, token, gifId) {
    let favorites = []

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(gifId, 'gif id')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites


                return call(`https://api.giphy.com/v1/gifs/random?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, 'get', undefined, undefined)

                    .then(gif => {
                        if (gif.error) throw new Error(gif.error)

                        favorites && (gif.favorite = favorites.includes(gifId))

                        return gif
                        
                    })
            })

    } else {
        validate.string(gifId, 'gif id')

        return call(`https://api.giphy.com/v1/gifs/random?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
            
            .then(gif => {
                if (gif.error) throw new Error(gif.error)

                return gif
            }) 
    }
}


