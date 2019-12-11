const { validate } = require('utils')
const { models: { User, Task, Comment } } = require('data')

/**
 * Posts a comment
 * 
 * @param {*} authorId author id
 * @param {*} author author username
 * @param {*} posted comment post date
 * @param {*} text comment text
 * @param {*} taskId task id
 * 
 * @throws {TypeError} - if date is not a date, if any of the other parameters is not a string.
 * @throws {Error} - if any parameter is empty or undefined, if user or task is not found.
 * 
 * @returns {String} comment id
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
        delete comment._id
    
        return commentId
    })()
}    
