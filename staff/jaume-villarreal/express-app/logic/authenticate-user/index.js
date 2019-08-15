const { validate , call } = require('../../utils')

module.exports = function(username, password) {
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')

    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username, password })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
            
            return response.data
        })
}