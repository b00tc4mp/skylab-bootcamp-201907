/**
 * Retrieves user data previous validated arguments 
 *
 * @param {String} user id.
 * @param {String} user token.
 * 
 * @throws {Error} When repassword doesn't match with password.
 * @throws {Error} When user API cannot register the user.
 * 
 * @returns {Object} An object with user data.
 */

logic.retrieveUser = function (id, token) {
    validate.str(id, 'id')
    validate.str(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
            return response.data
        })
}




