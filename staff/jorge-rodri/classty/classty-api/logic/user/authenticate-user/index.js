const { User } = require('../../../../data')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */
module.exports = function (email, password) {
    // TODO validate fields
    return (async () => {

        const user = await User.findOne({ email })

        if (!user) throw  Error(`user with e-mail ${email} does not exist`)

        if (user.password !== password) throw  Error('wrong credentials')
        
        return user.id
    })()
}