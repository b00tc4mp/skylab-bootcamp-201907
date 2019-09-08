const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User, Space, Task } } = require('../../../../e-cohabitat-data')

/**
 * Adds a task companion
 * 
 * @param {string} taskId
 * @param {string} spaceId
 * @param {string} companionId 
 * 
 * @returns {Promise}
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

        const matchSpace = task.taskSpace.find(location => location.toString() === spaceId)
        if (!matchSpace) throw Error(`task with id ${taskId} does not match space with id ${spaceId}`)

        const matchUser = task.companions.find(companion => companion.toString() === companionId)
        if (matchUser === companionId) throw Error(`user already added to task with id ${taskId}`)
        
        task.companions.push(companionId)
        await task.save()

        return task
    })()
}