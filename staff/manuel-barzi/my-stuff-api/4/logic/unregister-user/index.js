const { models: { User } } = require('my-stuff-data')
const bcrypt = require('bcryptjs')

/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    // TODO validate fields

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exist`)

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new Error(`wrong credentials`)

        await User.deleteOne({ _id: id })
    })()
}