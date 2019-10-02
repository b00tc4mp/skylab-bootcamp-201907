const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * deletes a user
 * @param {string} id 
 * @param {string} password 
 */

function unregisterUser (id, password) {
    
    validate.string(id, 'id')
    validate.string(password, 'password')

    return (async () => {

    const user = await User.findById(id)

    if (!user) throw new Error(`user with id ${id} not found`)

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw new Error(`wrong credentials`)

    const result = await User.deleteOne({ _id: id })

    if (!result.deletedCount) throw new Error(`could not delete user`)

    await Cache.deleteMany({ owner: id})

    })()
    
}

module.exports = unregisterUser