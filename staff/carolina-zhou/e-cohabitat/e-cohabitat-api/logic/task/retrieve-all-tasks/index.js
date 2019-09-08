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

        const user = await User.findById(userId)
        if (!user) throw Error(`user with id ${userId} does not exist`)

        const userTasks = user.tasks

        if (userTasks.length === 0) throw Error(`this user does not have any tasks`) 

        userTasks.forEach(task => {
            return task.id.toString()        
        })

        return userTasks
    })()
}