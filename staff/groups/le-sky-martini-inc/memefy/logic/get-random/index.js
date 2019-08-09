/**
 * Uses the Random Endpoint of the Giphy API.
 * If the user is already registered API returns an 'OK' status and user's id and token.
 * If the authentication goes wrong, API returns a 'KO' status and an error message.
 * 
 * @param {String} url Random endpoint url.
 * 
 * @return {Object} Response: { status, data { id, token } }
 */

logic.getRandom = function (undefined, undefined, undefined) {
    return call(`https://api.giphy.com/v1/gifs/random?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
        .then(randomGif => {
            if (randomGif.error) throw new Error(randomGif.error)
            return randomGif
        })
}