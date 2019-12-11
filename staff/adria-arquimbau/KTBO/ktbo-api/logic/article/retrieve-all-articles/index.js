const { models: { Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieves all articles.
 * 
 * @returns {Promise} - Returns a Promise with all articles
 */

module.exports = function () {

    return(async () => { 

        const articles = await Article.find({},{ __v: 0 }).sort({ref:1}).lean() 
        if (!articles) throw new Error('There are not any article')

        articles.forEach(article => {
            article.id = article._id.toString()
            delete article._id
        })
        
        return articles

    })()
}