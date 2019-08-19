const { validate, call } = require('../../utils')

function registerUser(name, surname, username, password, repassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.string(repassword, 'password repeat')

    if (password !== repassword) throw new Error('passwords do not match')

    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, { name, surname, username, password, favorites: [] })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
        })
}

module.exports = registerUser
