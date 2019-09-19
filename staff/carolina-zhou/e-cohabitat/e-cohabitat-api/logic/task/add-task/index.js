const { validate } = require('utils')
const { models: { User, Space, Task } } = require('data')

/**
 * Adds a task
 * 
 * @param {*} taskName task name
 * @param {*} taskType task type
 * @param {*} description task description
 * @param {*} date task date
 * @param {*} spaceId space id
 * @param {*} userId user id
 * 
 * @throws {TypeError} - if any of the parameters is not a string (except the date parameter), if date is not a date.
 * @throws {Error} - if any of the parameters is empty or undefined, if user/space is not found.
 * 
 * @returns {String} task id
 */

module.exports = function(taskName, taskType, description, date, spaceId, userId) {

    validate.string(taskName, 'task name')
    validate.string(taskType, 'task type')
    validate.string(description, 'task description')
    validate.date(date, 'task date')
    validate.string(spaceId, 'space id')
    validate.string(userId, 'creator-user id')

    return (async () => {
        const user = await User.findById(userId) 
        if (!user) throw Error('user does not exist')

        const space = await Space.findById(spaceId)
        if (!space) throw Error('space does not exist') 
        
        const task = new Task({ taskName, taskType, description, date, taskSpace: spaceId })
        task.companions.push(userId)
        task.companionNames.push(user.username)
        await task.save()
        
        const taskId = task._id.toString()
        delete task._id

        user.tasks.push(taskId)
        await user.save()
        
        space.spaceTasks.push(taskId)
        await space.save()
    
        return taskId
    })()
}    
