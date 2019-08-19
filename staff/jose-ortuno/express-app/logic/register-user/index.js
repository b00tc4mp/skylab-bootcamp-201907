const { validate, call } = require('../../utils')

module.exports = function (name, surname, username, password, repassword) {

    validate.multiple([
        { type: 'string', target: name, name: 'name' },
        { type: 'string', target: surname, name: 'surname' },
        { type: 'string', target: username, name: 'username' },
        { type: 'string', target: password, name: 'password' },
        { type: 'string', target: repassword, name: 'repassword' },
        { type: 'match', target: [password, repassword] }
    ])

    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, { name, surname, username, password, favorites: [] })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
        })
}
