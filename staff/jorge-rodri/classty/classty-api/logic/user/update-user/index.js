const { User } = require('../../../../data')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    if( id.length == 0 ) throw Error('id is empty')
    debugger
    if( typeof data != 'object') throw Error('data is not a object')

    return (async () => {
        const user = await User.findByIdAndUpdate(id, { $set: data })
        debugger
        if (!user) throw Error(`user with id ${id} does not exist`)
debugger
    })()
}