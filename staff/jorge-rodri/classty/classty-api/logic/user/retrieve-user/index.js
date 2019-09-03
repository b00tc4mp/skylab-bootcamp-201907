const { User } = require('../../../data')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
        if( id.length == 0 ) throw Error('id is empty')
    return (async () => {

        let user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()

        if (!user) throw Error(`user with id ${id} not found`)

        user.id = id

        return user
    })()
}