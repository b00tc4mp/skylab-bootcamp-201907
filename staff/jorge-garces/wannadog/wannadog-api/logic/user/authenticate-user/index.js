const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User } = models


/**
* 
* @param {*} email 
* @param {*} password 
* 
* @returns {Promise}
*/

module.exports = function (email, password) {

    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email, password })
        if (!user) throw Error('Wrong credentials.')
        return user.id
    })()
}
