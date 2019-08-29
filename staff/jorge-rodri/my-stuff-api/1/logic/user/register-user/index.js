const { User } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, password, card) {
    // TODO validate fields
    return (async () => {
        
        const user = await User.findOne({ email })

        if (user) throw Error(`user with e-mail ${email} already exists`)

        await User.create({ name, surname, email, password, card })
    
    })()
}