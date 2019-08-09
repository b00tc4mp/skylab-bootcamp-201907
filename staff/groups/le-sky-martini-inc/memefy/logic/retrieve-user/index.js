/**
 * Retrieves user via own user API. 
 * If the validation goes wrong, it shows a message with the response error.
 * 
 * @param {String} id The user id.
 * @param {String} token The token to authorize user validation.
 * 
 * @return {Object} Response: { status, data { name, surname, username, id } }
 */

logic.retrieveUser = function (id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            return response.data
        })
}