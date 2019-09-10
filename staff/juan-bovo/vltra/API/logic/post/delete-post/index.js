const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')



module.exports = function(postId, userId) {
    
    validate.objectId(postId, 'postId')
    validate.objectId(userId, 'userId')
    
    return( async () => {
        const post = await Post.findById(postId)

        if (!post) throw Error(`post with id ${postId} does not exist`)
        debugger
        if (post.author.toString() !== userId) throw Error(`postId ${postId} does not belong to userId ${userId}`)

        await Post.deleteOne({ _id : postId })
        //const postToDelete = await Post.deleteOne({ _id : postId })

        //if (!postToDelete.deletedCount) throw Error(`post with id ${postId} does not exist`)

    })()
}