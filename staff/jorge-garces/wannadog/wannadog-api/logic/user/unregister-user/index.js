const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const bcrypt = require('bcryptjs')
const { User, Dog } = models

/**
 * Unregisters a user by their id
 * 
 * @param {string} id
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
*/
module.exports = function (id, email, password) {
    validate.string(id, 'id')
    validate.string(email, 'email')
    validate.string(password, 'password')

    return (async () => {

        const userDogs = await User.findOne({ email })

        const match = await bcrypt.compare(password, userDogs.password)
        if (!match) throw Error('Wrong credentials')

        if (userDogs.dogs.length) await Dog.deleteMany({ owner: id })

        const user = await User.deleteOne({ _id: id, email })
        if (!user.deletedCount) throw Error(`There was an error unregistering the user`)
    })()
}