const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Retrieves all the tasks added by a particular user
 * 
 * @param {*} userId user id
 * 
 * @throws {TypeError} - if user id is not a string.
 * @throws {Error} - if user id is empty or undefined, if user is not found.
 * 
 * @returns {Array} task id array
*/

module.exports = function(userId) {
    
    validate.string(userId, 'user id')

    return (async() => {

        const user = await User.findById(userId).populate('tasks')
        if (!user) throw Error(`user with id ${userId} does not exist`)

        return user.tasks
    })()
}