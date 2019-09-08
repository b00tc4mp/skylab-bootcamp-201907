const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User, Task, Comment } } = require('../../../../e-cohabitat-data')

/**
 * Posts a comment
 * 
 * @param {*} author 
 * @param {*} posted 
 * @param {*} text 
 * @param {*} taskId 
 * 
 * @returns {Promise}
 */

module.exports = function(author, posted, text, taskId) {

    validate.string(author, 'author id')
    validate.date(posted, 'comment date')
    validate.string(text, 'comment text')
    validate.string(taskId, 'task id')

    return (async () => {
        
        const user = await User.findById(author) 
        if (!user) throw Error('user does not exist')

        const task = await Task.findById(taskId)
        if (!task) throw Error('task does not exist')
        
        const comment = await Comment.create({ author, posted, text, taskId })
        task.comments.push(comment)
        await task.save()
        
        const commentId = comment._id.toString()
    
        return commentId
    })()
}    
