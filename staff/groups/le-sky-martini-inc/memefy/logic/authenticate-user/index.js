/**
 * Authenticates users via Skylabcoders' Herokuapp API.
 * If the user is already registered API returns an 'OK' status and user's id and token.
 * If the authentication goes wrong, API returns a 'KO' status and an error message.
 * 
 * @param {String} username The user email.
 * @param {String} password The user password.
 * 
 * @return {Object} Response: { status, data { id, token } }
 */

logic.authenticateUser = function (username, password) {
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')

    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username, password })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
            
            return response.data
        })
}

