const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User, Task } } = require('../../../../e-cohabitat-data')

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

        const match = task.companions.find(user => user.toString() === companionId)
        if (!match) throw Error(`user with id ${companionId} is not a task companion`)

        task.companions.splice(task.companions.indexOf(match), 1)
        await task.save()
        if (task.companions.length === 0) {
            const result = await task.deleteOne({ _id: taskId })
            if (!result.deletedCount) throw Error('wrong data provided')
        }
        return task
    })()
}