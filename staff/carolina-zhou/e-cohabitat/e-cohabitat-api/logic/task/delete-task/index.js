const { validate } = require('utils')
const { models: { User, Space, Task } } = require('data')

/**
 * Deletes a task
 * 
 * @param {string} userId 
 * @param {string} spaceId 
 * @param {string} taskId 
 * 
 * @returns {Promise}
*/

module.exports = function(userId, spaceId, taskId) {

    validate.string(userId, 'user id')
    validate.string(spaceId, 'space id')
    validate.string(taskId, 'task id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`there is no user with the provided user id`)

        const space = await Space.findById(spaceId)
        if(!space) throw Error(`there is no space with the provided space id`)

        const searchTask = await Task.findById(taskId)
        if(!searchTask) throw Error(`there is no task with the provided task id`)

        const task = user.tasks.find(task => task.toString() === taskId)
        if(task === undefined) throw Error('this user did not register the task introduced')

        const spaceTask = space.spaceTasks.find(task => task.toString() === taskId)
        if(spaceTask === undefined) throw Error('this user did not register the task introduced')

        const result = await Task.deleteOne({ _id: taskId })
        if (!result.deletedCount) throw Error('wrong data provided')

        user.tasks.splice(user.tasks.indexOf(task), 1)
        await user.save()

        space.spaceTasks.splice(space.spaceTasks.indexOf(task), 1)
        await space.save()
    })()
}