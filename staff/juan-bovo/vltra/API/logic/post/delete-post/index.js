const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')



module.exports = function(postId) {
    validate.objectId(postId, 'postId')

    return( async () => {
        const postToDelete = await Post.deleteOne({ _id : postId })

        if (!postToDelete.deletedCount) throw Error(`post with id ${postId} does not exist`)

    })()
}