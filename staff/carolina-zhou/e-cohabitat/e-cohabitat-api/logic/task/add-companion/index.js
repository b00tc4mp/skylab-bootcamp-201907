const { validate } = require('utils')
const { models: { User, Space, Task } } = require('data')

/**
 * Adds a task companion.
 * 
 * @param {string} taskId task id
 * @param {string} spaceId space id
 * @param {string} companionId companion id
 * 
 * @throws {TypeError} - if any of the parameters is not a string.
 * @throws {Error} - if any of the parameters is empty or undefined, if user/space/task is not found, if task and space do not match, if user to add is already a companion.
 * 
 * @returns {Object} task object
*/

module.exports = function(taskId, spaceId, companionId) {

    validate.string(taskId, 'task id')
    validate.string(spaceId, 'space id')
    validate.string(companionId, 'companion id')

    return (async () => {
        const user = await User.findOne({ _id: companionId })
        if (!user) throw Error('wrong user id provided')

        const space = await Space.findOne({ _id: spaceId })
        if (!space) throw Error('wrong space id provided')

        const task = await Task.findOne({ _id: taskId })
        if (!task) throw Error('wrong task id provided')

        if (task.taskSpace.toString() != spaceId) throw Error(`task with id ${taskId} does not match space with id ${spaceId}`)

        const matchUser = task.companions.find(companion => companion.toString() === companionId)
        if (matchUser === companionId) throw Error(`user already added to task with id ${taskId}`)
        
        task.companions.push(companionId)
        task.companionNames.push(user.username)
        await task.save()

        user.tasks.push(taskId)
        await user.save()

        return task
    })()
}