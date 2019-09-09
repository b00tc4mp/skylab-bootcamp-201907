const { validate } = require('utils')
const { models: { User, Task, Comment } } = require('data')

/**
 * Posts a comment
 * 
 * @param {*} authorId 
 * @param {*} author 
 * @param {*} posted 
 * @param {*} text 
 * @param {*} taskId 
 * 
 * @returns {Promise}
 */

module.exports = function(authorId, author, posted, text, taskId) {

    validate.string(authorId, 'author id')
    validate.string(author, 'author username')
    validate.date(posted, 'comment date')
    validate.string(text, 'comment text')
    validate.string(taskId, 'task id')

    return (async () => {
        
        const user = await User.findById(authorId) 
        if (!user) throw Error('user does not exist')

        const task = await Task.findById(taskId)
        if (!task) throw Error('task does not exist')
        
        const comment = await Comment.create({ authorId, author, posted, text })
        task.comments.push(comment)
        await task.save()
        
        const commentId = comment._id.toString()
    
        return commentId
    })()
}    
