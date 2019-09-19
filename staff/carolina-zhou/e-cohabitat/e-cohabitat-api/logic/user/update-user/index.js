const { validate } = require('utils')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * Updates user information
 * 
 * @param {string} id user id
 * @param {Object} dataToUpdate data to update
 * 
 * @throws {TypeError} - if user id is not a string, if data to update is not an object.
 * @throws {Error} - if any parameter is empty, undefined or user is not found.
 * 
 * @returns {Promise} user object.
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