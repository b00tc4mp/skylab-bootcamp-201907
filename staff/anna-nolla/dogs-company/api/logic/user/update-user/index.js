const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Update a user through his id 
 * 
 * @param {String} id
 * @param { } fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'user id')

    return (async () => {
        const user = await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
            if (!user) throw Error(`User with id ${id} does not exist.`)
    })()
}