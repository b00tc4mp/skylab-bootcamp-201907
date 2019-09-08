const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User, Task } } = require('../../../../e-cohabitat-data')

/**
 * Deletes a task
 * 
 * @param {string} userId 
 * @param {string} taskId 
 * 
 * @returns {Promise}
*/

module.exports = function(userId, taskId) {

    validate.string(userId, 'user id')
    validate.string(taskId, 'task id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`there is no user with the provided user id`)

        const searchTask = await Task.findById(taskId)
        if(!searchTask) throw Error(`there is no task with the provided task id`)

        const task = user.tasks.find(task => task.toString() === taskId)
        if(task === undefined) throw Error('this user did not register the task introduced')

        const result = await Task.deleteOne({ _id: taskId })
        if (!result.deletedCount) throw Error('wrong data provided')

        user.tasks.splice(user.tasks.indexOf(task), 1)
        user.save()
    })()
}