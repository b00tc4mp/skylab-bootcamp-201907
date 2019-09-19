const { models: { Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * 
 * @param {*} ref 
 * 
 * @returns {Promise}
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