const { models: { User, Post, Comment } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Deletes a comment from a post
 * @param {objectId} commentId mongoose embedded comment id to delete
 * @param {objectId} postId mongoose post id where comment should be embedded
 * 
 * @returns {undefined}
 */

module.exports = function(commentId, postId) { //(commentId, postId, email, password)
    
    validate.objectId(commentId, 'commentId')
    validate.objectId(postId, 'postId')
    
    return( async () => {
        const post = await Post.findById(postId)

        if (!post) throw Error(`post with id ${postId} does not exists`)

        const { comments } = post
        
        const index = comments.findIndex(comment => comment.id === commentId)
        if (index<0) throw Error(`commentId with value ${commentId} not found`)
        comments.splice(index, 1)
        
        await post.save()

    })()
}