const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User } } = require('../../../../e-cohabitat-data')

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

        if (user.tasks.length === 0) throw Error(`this user does not have any tasks`) 

        user.tasks.forEach(task => {
            task.id = task._id.toString()
            delete task._id

            return task        
        })

        return user.tasks
    })()
}