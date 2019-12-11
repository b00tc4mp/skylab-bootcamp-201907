const { validate } = require('utils')
const { models: { User, Task, Comment } } = require('data')

/**
 * Deletes a comment made on a specific task
 * 
 * @param {string} userId user id
 * @param {string} commentId comment id
 * 
 * @throws {TypeError} - if user id or comment id is not a string.
 * @throws {Error} - if any parameter is empty or undefined, if user/task/comment is not found, if comment and task do not match, if user is not the author of the comment.
 * 
 * @returns {Promise}
*/

module.exports = function(userId, taskId, commentId) {

    validate.string(userId, 'user id')
    validate.string(taskId, 'task id')
    validate.string(commentId, 'comment id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`there is no user with the provided user id`)

        const searchComment = await Comment.findById(commentId)
        if(!searchComment) throw Error(`there is no comment with the provided comment id`)

        const task = await Task.findById(taskId)
        if(!task) throw Error(`there is no task with the provided task id`)

        const comment = task.comments.find(comment => comment._id.toString() === commentId)
        if(!comment) throw Error('this comment was not found in the task introduced')
        if(searchComment.authorId.toString() !== userId) throw Error('this user is not the author of the comment to delete')

        const result = await Comment.deleteOne({ _id: commentId })
        if (!result.deletedCount) throw Error('wrong data provided')

        user.id = user._id.toString()
        delete user._id

        task.id = task._id.toString()
        delete task._id

        searchComment.id = searchComment._id.toString()
        delete searchComment._id

        task.comments.splice(task.comments.indexOf(comment), 1)
        await task.save()
    })()
}