const { validate, call } = require('../../utils')
const literals = require('./i18n')

function registerUser(name, surname, username, password, repassword, lang) {

    const { n, s, u, p } = literals[lang]

    validate.string(name, n, lang)
    validate.string(surname, s, lang)
    validate.string(username, u, lang)
    validate.email(username, u)
    validate.string(password, p)
    validate.string(repassword, p)

    if (password !== repassword) throw new Error('passwords do not match')

    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, { name, surname, username, password, favorites: [] })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
        })
}

module.exports = registerUser
