const { models: { Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieve all articles that contain a part of the query in the title.
 * 
 * @param {String} query - Query to perform the search. 
 * 
 * @returns {Promise} - Return a Promise with articles.
*/

module.exports = function(query) {

    validate.string(query, 'query')

    return (async () => {
        
        const articles = await Article.find( {"title": { "$regex": `${query}`, "$options": "i" }},{ __v: 0 }).sort({_id:1}).lean() 
        if (!articles) throw Error(`there are not articles with query ${query}`)    

        articles.forEach(article => {
            article.id = article._id.toString()
            delete article._id
        })

        return articles

    })()
}