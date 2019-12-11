const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Deletes a post
 * @param {objectId} postId mongoose post id to delete
 * @param {objectId} userId mongoose user id to check post ownership
 * 
 * @returns {undefined} 
 */

module.exports = function(userId, postId) {
    
    validate.objectId(userId, 'userId')
    validate.objectId(postId, 'postId')
    
    return( async () => {
        const post = await Post.findById(postId)

        if (!post) throw Error(`post with id ${postId} does not exist`)
        
        if (post.author.toString() !== userId) throw Error(`postId ${postId} does not belong to userId ${userId}`)

        await Post.deleteOne({ _id : postId })

    })()
}