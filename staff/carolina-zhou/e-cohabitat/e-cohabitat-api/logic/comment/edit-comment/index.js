const { validate } = require('utils')
const { models: { Comment, Task } } = require('data')

/**
 * Edits a comment
 * 
 * @param {*} commentId
 * @param {*} text 
 * @param {*} taskId
 * 
* @returns {Promise}
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