const { validate } = require('utils')
const { models: { User, Task } } = require('data')

/**
 * Unregisters a task companion
 * 
 * @param {string} taskId
 * @param {string} companionId 
 * 
 * @returns {Promise}
*/

module.exports = function(taskId, companionId) {

    validate.string(taskId, 'task id')
    validate.string(companionId, 'companion id')

    return (async () => {
        const task = await Task.findOne({ _id: taskId })
        if (!task) throw Error('wrong task id provided')

        const user = await User.findOne({ _id: companionId })
        if (!user) throw Error('wrong companion id provided')

        const matchTask = user.tasks.find(task => task.toString() === taskId)
        const matchCompanion = task.companions.find(user => user.toString() === companionId)
        if ((matchTask === undefined) || (matchCompanion === undefined)) throw Error(`user with id ${companionId} is not a task companion`)

        user.tasks.splice(user.tasks.indexOf(matchTask), 1)
        await user.save()

        task.companions.splice(task.companions.indexOf(matchCompanion), 1)
        await task.save()
        if (task.companions.length === 0) {
            const result = await task.deleteOne({ _id: taskId })
            if (!result.deletedCount) throw Error('wrong data provided')
        }
        return task
    })()
}