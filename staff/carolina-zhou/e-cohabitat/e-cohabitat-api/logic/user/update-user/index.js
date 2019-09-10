const { validate } = require('utils')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} dataToUpdate
 * 
 * @returns {Promise}
 */

module.exports = function (id, dataToUpdate) {

    validate.string(id, 'user id')
    validate.object(dataToUpdate, 'body')
    
    return (async() => {

        if (dataToUpdate.password) {
            const hash = await bcrypt.hash(dataToUpdate.password, 10)
            dataToUpdate.password = hash
        }
        
        const user = await User.findByIdAndUpdate(id, { $set: dataToUpdate })
        if (!user) throw Error(`user with id ${id} does not exist`)
    })()
}