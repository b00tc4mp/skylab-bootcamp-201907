const { models: { User, Post,Comment } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Retrieves all the comments for a post
 * @param {objectId} postId mongoose post id to retrieve comments from
 * 
 * @returns {Array} array with requested comments' ids
 */

module.exports = async function(postId){
    validate.objectId(postId, 'postId')
    
    const post = await Post.findOne({_id: postId }, {_id: 0, __v: 0 }).lean()
    
    if(!post) throw Error(`post with id ${postId} does not exist`)

    post.comments.forEach(comment => {
        comment.id = comment._id
        delete comment._id
    })
    

    return post.comments
}