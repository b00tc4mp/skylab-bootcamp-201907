const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Retrieves an array of post with a certain author
 * @param {objectId} authorId author's id on db
 * 
 * @returns {string} generated post's id
 */

module.exports = async function(authorId){
    validate.objectId(authorId, 'authorId')
    
    const user = await User.findOne({_id: authorId }, {_id: 0, __v: 0 }).lean()
    
    if(!user) throw Error(`user with id ${authorId} does not exist`)

    return( async () => {
        const posts = await Post.find({author: authorId }, { __v: 0 }).lean()
        
        if(posts.length === 0) throw Error(`author with authorId ${authorId} does not have any posts`)
        
        posts.forEach(post => {
            post.id = post._id
            delete post._id
        })
        
        return posts
    })()
}