const { validate, call } = require('../../utils')

function authenticateUser(username, password) {
    validate.multiple([
        { type: 'string', name: 'username' , target: username },
        { type: 'string', name: 'password' , target: password },
        { type: 'email', name: 'username' , target: username }
    ])

    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username, password })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            return response.data
        })
}

module.exports = authenticateUser