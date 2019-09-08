const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')


module.exports = function(id){
    validate.string(id, 'postId')
    debugger

    return( async () => {
        const post = await Post.findOne({_id: id }, {_id: 0, __v: 0 }).lean()

        if(!post) throw Error(`post with id ${id} does not exist`)
        
        post.id = id

        return post
    })()
}