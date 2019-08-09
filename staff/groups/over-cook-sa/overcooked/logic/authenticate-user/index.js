/** 
 * Authenticate a user through the service via Skylabcoders users API
 * by providing the inputs collected on the register form.
 * Return JSON response that includes user id 
 * 
 * @param {string} username   - Username used to sign in into the service
 * @param {string} password   - Password used to sign in into the service 
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

