const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
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