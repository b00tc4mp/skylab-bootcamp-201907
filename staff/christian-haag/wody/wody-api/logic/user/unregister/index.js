const { validate } = require('wody-utils')
const { models: { User } } = require('wody-data')
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

    validate.string(id, 'id')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findById({ _id: id })

        if (!user) throw Error('wrong credentials')

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw Error('wrong credentials')

        const result = await User.deleteOne({ _id: id, password: user.password })

        if (!result.deletedCount) throw new Error(`wrong credentials`)

    })()
}