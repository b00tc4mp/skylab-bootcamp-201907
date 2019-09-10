/**
 * It allows the user to mark favourites o remove them from favourite list. 
 * User has an array with their favourites.
 * If the validations go wrong, it shows a message with the response error.
 * 
 * @param {String} id The user id.
 * @param {String} token The token to authorize user validation.
 * @param {String} trackId  The id song.
 * 
 * @return {Object} Change favorites array, it can add or remove.
 */

logic.toggleFavTrack = function (id, token, trackId) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(trackId, 'track id')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites
            

            const index = favorites.findIndex(favorite => favorite == trackId)

            if (index > -1) {
                favorites.splice(index, 1)

                return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
            } else
                return call(`http://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.get?apikey=e492562d27469098b0922d5d580837eb&commontrack_id=${trackId}`, 'get', undefined, undefined)
                    .then(track => {
                        if(track.message.header.status_code === 404) throw new Error("invalid track id")

                       favorites.push(trackId)

                        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                            .then(response => {
                                if (response.status === 'KO') expression(new Error(response.error))
                            })
                    })
        })
}