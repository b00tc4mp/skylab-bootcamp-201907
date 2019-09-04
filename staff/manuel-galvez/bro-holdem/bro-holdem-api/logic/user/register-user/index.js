const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * 
 * @param {*} username 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
 */

module.exports = function (username, email, password) {

    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email })
        if (user) throw Error(`User with e-mail ${email} already exists.`)
        const uname = await User.findOne({ username })
        if (uname) throw Error('Username is already taken.')
        await User.create({ username, email, password })
    })()
}