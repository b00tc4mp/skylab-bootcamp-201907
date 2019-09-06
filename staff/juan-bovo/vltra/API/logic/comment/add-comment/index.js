const { models: { User, Post, Comment } } = require('vltra-data')
const { validate} = require('vltra-utils')



module.exports = function(postId, commentAuthor, commentBody, commentDate) {

    validate.objectId(postId, 'postId')
    validate.objectId(commentAuthor, 'commentAuthor')
    validate.string(commentBody, 'commentBody')
    validate.date(commentDate, 'commentDate')

    if(commentBody.length > 500) throw Error('comments larger than 500 chars are not allowed')
    
    return (async () => {
        const postToComment = await Post.findOne({ _id:postId })
        
        if (!postToComment) throw Error(`post with id ${postId} does not exists`)
            
        const newComment = new Comment({
            commentBody,
            commentDate
        })
        newComment.commentAuthor = commentAuthor

        postToComment.comments.push(newComment)
        
        await postToComment.save()
        
        newCommentId = newComment._id.toString()

        return newCommentId

    })()
}