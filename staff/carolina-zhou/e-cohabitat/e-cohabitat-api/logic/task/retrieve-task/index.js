const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User, Space, Task } } = require('../../../../e-cohabitat-data')

/**
 * Retrieves a task by its id
 * 
 * @param {*} taskId
 * 
 * @returns {Promise}
*/

module.exports = function(userId, spaceId, taskId) {
    
    validate.string(userId, 'user id')
    validate.string(spaceId, 'space id')
    validate.string(taskId, 'task id')

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`user with id ${userId} does not exist`)

        const space = await Space.findById(spaceId)
        if (!space) throw Error(`space with id ${spaceId} does not exist`)

        const task = await Task.findOne({ _id: taskId }, { _id: 0 }).lean()
        if (!task) throw Error(`space with id ${taskId} does not exist.`)
        task.id = taskId

        if (user.tasks.length === 0) throw Error(`this user does not have any tasks`) 

        const retrievedTask = user.tasks.find(retrievedTask => retrievedTask.toString() === taskId)
        if(retrievedTask === undefined) throw Error('this user did not register the task introduced')

        const correctSpace = task.taskSpace.find(correctSpace => correctSpace.toString() === spaceId)
        if(correctSpace === undefined) throw Error('this task is not registered in this space')

        return task
    })()
}