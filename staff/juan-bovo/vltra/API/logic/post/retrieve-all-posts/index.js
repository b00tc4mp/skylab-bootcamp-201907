const { models: { User, Post } } = require('vltra-data')
// const { validate} = require('vltra-utils')


module.exports = function(){

    return(async () => {
        const posts = await Post.find({ }, {_id: 0, __v: 0 }).lean()
        
        if(posts.length === 0) throw Error(`there are no post to retrieve`)
        
        posts.forEach(post => {
            post.id = post._id
            delete post._id
        })
        return posts
    })()
}