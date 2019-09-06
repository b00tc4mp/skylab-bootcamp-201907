const { models: { User, Post,Comment } } = require('vltra-data')
const { validate} = require('vltra-utils')


module.exports = async function(postId){
    validate.objectId(postId, 'postId')
    
    const post = await Post.findOne({_id: postId }, {_id: 0, __v: 0 }).lean()
    debugger
    if(!post) throw Error(`post with id ${postId} does not exist`)

    //if(post.length === 0) throw Error(`post with postId ${postId} does not have any comments`)

    post.comments.forEach(comment => {
        comment.id = comment._id
        delete comment._id
    })
    debugger

    return post.comments
}