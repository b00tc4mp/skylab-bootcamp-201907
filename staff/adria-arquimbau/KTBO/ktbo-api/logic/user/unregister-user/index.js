const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')
const bcrypt = require('bcryptjs')

/**
 * Unregisters a user.
 * 
 * @param {string} id - Identifier of the user.
 * @param {string} password
 * 
 */

module.exports = function (id, password) {

    validate.string(id, 'id')
    validate.string(password, 'password')

    return (async () => {

        const res = await User.findById({ _id: id})
        if(!res) throw Error (`User with id ${id} doesn\'t exist`)

        const match = await bcrypt.compare(password, res.password)
        if (!match) throw new Error('wrong credentials')

        const result = await User.deleteOne({ _id: id, password: res.password })
        if (!result.deletedCount) throw new Error(`wrong credentials`)
        
    })()
}