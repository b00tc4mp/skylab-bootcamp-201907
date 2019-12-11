const { models: { User } } = require('democratum-data')
const { validate } = require('../../../utils/validate')

/**
 * Retrieves a poll.
* 
* @param {String} userId The id of the user.
* @returns {}}
*
*/

module.exports = function (userId) {

    //validate.string(id, 'user id')

    return (async () => {
        const user = await User.findOne({ _id: userId }, { _id: 0, password: 0 }).lean()
        
        if (!user) throw Error(`citizen ${userId} not found`)
        
        else {
            user.id = userId
            return await user
        }
    })()
}