const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User, Task, Comment } } = require('../../../../e-cohabitat-data')

/**
 * Unregisters a space
 * 
 * @param {string} userId
 * @param {string} commentId 
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
        if(searchComment.author.toString() !== userId) throw Error('this user is not the author of the comment to delete')

        const task = await Task.findById(taskId)
        if(!task) throw Error(`there is no task with the provided task id`)

        const comment = task.comments.find(comment => comment._id.toString() === commentId)
        if(comment === undefined) throw Error('this comment was not posted in the task introduced')

        if(comment.author.toString() !== userId) throw Error('this user is not the author of the comment to delete')

        const result = await Comment.deleteOne({ _id: commentId })
        if (!result.deletedCount) throw Error('wrong data provided')

        task.comments.splice(task.comments.indexOf(comment), 1)
        task.save()
    })()
}