const { validate } = require('utils')
const { models: { Comment, Task } } = require('data')

/**
 * Edits a comment made on a specific task.
 * 
 * @param {*} commentId comment id
 * @param {*} text comment text to update
 * @param {*} taskId task id
 * 
 @throws {TypeError} - if comment id or task id is not a string, if text to update is not an object.
 * @throws {Error} - if any parameter is empty or undefined, if task or comment is not found, if comment and task do not match.
 * 
* @returns {Object} comment object.
*/

module.exports = function(commentId, text, taskId) {
    
    validate.string(commentId, 'comment id')
    validate.object(text, 'body')
    validate.string(taskId, 'task id')

    return (async() => {
        const task = await Task.findById(taskId)
        if (!task) throw Error('task does not exist')

        const comment = await Comment.findByIdAndUpdate(commentId, { $set: text })
        if (!comment) throw new Error(`comment with id ${commentId} does not exist`)
        
        const match = task.comments.find(result => result._id.toString() === commentId)
        if (match === undefined) throw Error(`comment with id ${commentId} is not in this task`)

        task.comments.splice(task.comments.indexOf(match), 1, comment)
        await task.save()

        return comment
    })()
}