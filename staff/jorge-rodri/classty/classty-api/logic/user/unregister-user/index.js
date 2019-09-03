const { models: { User } } = require('data')
const { validate } = require('utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, password) {
    validate.number(id, 'id')
    validate.string(password)
    
    if(id.length == 0) throw Error('id is empty')
    return (async () => {

        const result = await User.deleteOne({ _id: id, password })

        if (!result.deletedCount) throw Error(`wrong credentials`)

    })()
}