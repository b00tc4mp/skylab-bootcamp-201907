/**Function that authenticate an user
 * @param {string} username  username of user
 * @param {string} username  password of user
 * @throws {Error} incorrect params value
 * @return JSON whit the dates of user
 */
logic.authenticateUser = (username, password) => {
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username, password })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
            
            return response.data
        })
}