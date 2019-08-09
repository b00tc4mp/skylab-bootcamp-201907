/**
 * Retrieves user credentials previous validated arguments 
 *
 * @param {String} user username [email].
 * @param {String} user password.
 * 
 * @throws {Error} When user API doesn't retrieve credentials.
 * 
 * @returns {Array} An array with jokes.
 */

logic.authenticateUser = function (username, password) {
    validate.str(username, 'username')
    validate.email(username, 'username')
    validate.str(password, 'password')

    return call("https://skylabcoders.herokuapp.com/api/auth", 'post', { 'content-type': 'application/json' }, { username, password })
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)

            return response.data
        })
}