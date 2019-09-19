const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Adds a vote to a post's votes array, and ads post's id to user's voted array.
 * (user can't vote twice on a post)
 * @param {objectId} userId user's id on db
 * @param {objectId} postId post's id on db
 * @param {Number} userVote number expressing user's valoration on a post id on db (min 1, max 5)
 * 
 * @returns {string} message confirmation
 */

module.exports = function(userId, postId, userVote) {
    
    validate.objectId(userId, 'userId')
    validate.objectId(postId, 'postId')
    validate.number(userVote, 'userVote')

    if(userVote < 1 || userVote > 5) throw Error('userVote min value = 1, max value = 5')
    
    return( async () => {
        const post = await Post.findById(postId)

        if (!post) throw Error(`post with id ${postId} does not exist`)

        const user = await User.findById(userId)

        if (!user) throw Error(`user with id ${userId} does not exist`)

        const index = user.voted.includes(postId)
        if (index) throw Error(`postId with value ${postId} has been already voted by this user`)

        post.votes.push(userVote)

        user.voted.push(postId)

        await post.save()
        await user.save()
    })()
}