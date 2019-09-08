const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')


module.exports = function(userId, postId ) {
    validate.string(userId, 'postId')
    validate.string(postId, 'postId')
   
    return (async () => {
        const post = await Post.findById(postId).lean()
        if (!post) throw new Error(`post with id ${adId} not found`)

        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)

        const bookmark = user.bookmarks.indexOf(postId)

        if (bookmark==-1) user.bookmarks.push(postId)

        else user.bookmarks.pull(postId)
        
        await user.save()
        
        return user.bookmarks
    })()
}
