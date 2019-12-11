const { validate } = require('utils')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * Unregisters an existing user account.
 * 
 * @param {string} id user's id
 * @param {string} password user's password
 * 
 * @throws {TypeError} - if user id or password is not a string.
 * @throws {Error} - if any parameter is empty or undefined, if user is not found, if the password introduced does not match user's password.
 * 
 * @returns {Promise}
 */

module.exports = function (id, password) {
    
    validate.string(id, 'user id')
    validate.string(password, 'password')

    return (async () => {

        const user = await User.findById({ _id: id })
        if (!user) throw Error('wrong credentials')

        user.id = user._id.toString()
        delete user._id

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw Error('wrong credentials')

        const deletedUser = await User.deleteOne({ _id: id })
        if (deletedUser.deletedCount === 0) throw new Error(`there was an error unregistering the user`)
    })()
}