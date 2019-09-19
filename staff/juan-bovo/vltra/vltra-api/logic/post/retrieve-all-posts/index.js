const { models: { User, Post } } = require('vltra-data')
// const { validate} = require('vltra-utils')

/**
 * retrieves all posts from db
 * 
 * @returns {Array} array with posts from db.
 */

module.exports = function(){

    return(async () => {
        const posts = await Post.find({ }, { __v: 0 }).sort({date: -1}).lean()
        
        if(posts.length === 0) throw Error(`there are no post to retrieve`)
        
        posts.forEach(post => {
            post.id = post._id
            delete post._id
        })
        
        return posts
    })()
}