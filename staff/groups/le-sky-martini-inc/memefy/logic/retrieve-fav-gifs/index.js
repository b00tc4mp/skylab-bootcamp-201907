/**
 * It allows a registered and logged user to check or remove favorite GIFs from its favorites array.
 * Check: renders all user's favorite gifs by id.
 * Remove: It checks whether the GIF id already exists in the favorites section. If it does, the function removes it; if it doesn't.
 * If the validations go wrong, it shows a message with the response error.
 * 
 * @param {String} id The user id.
 * @param {String} token The token to authorize user validation.
 * @param {String} gifid The GIF id.
 * 
 * @return {Object} Response on the process and modifies favorites array.
 */



logic.retrieveFavGifs = function (id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            const calls = favorites.map(gifId =>
                call(`https://api.giphy.com/v1/gifs/${gifId}?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
                    // .then(res => res.data)
                    .then(gif => (gif.favorite = true) && gif)
            )

            return Promise.all(calls)
        })
}