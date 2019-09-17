const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Retrieves all the tasks added by a particular user
 * 
 * @param {*} userId 
 * 
 * @returns {Promise}
*/

module.exports = function(userId) {
    
    validate.string(userId, 'user id')

    return (async() => {

        const user = await User.findById(userId).populate('tasks')
        if (!user) throw Error(`user with id ${userId} does not exist`)

        return user.tasks
    })()
}