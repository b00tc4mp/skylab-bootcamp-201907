const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Creates a new post on database
 * @param {string} title post's title
 * @param {string} body post's content
 * @param {objectId} author post's author (mongoose objectId reference)
 * 
 * @returns {string} generated post's id
 */


module.exports = function(title, body, author) {

    validate.string(title, 'title')
    validate.string(body, 'body')
    validate.objectId(author, 'author')
    //validate.date(date, 'date')
    //validate.array(comments, 'comments')
    //validate.array(votes, 'votes')

    if(body.length > 2000) throw Error('post body is too long (max. 2000 characters)')
    if(title.length > 100) throw Error('title body is too long (max. 100 characters)')
    
    return (async () => {
        const date = new Date
        const comments = []
        const votes = []

        const post = await Post.findOne({ body })
        if (post) throw Error(`post with content ${body} already exists`)
        
        const newPost = new Post({
            title, 
            body, 
            date, 
            comments, 
            votes
        })
        newPost.author = author
        
        await  newPost.save()

        const response = await Post.findOne({ body })
        
        //if (!response) throw new Error(`post with content ${body} does not exist`)
        newPostId = response._id.toString()
        return newPostId

    })()
}