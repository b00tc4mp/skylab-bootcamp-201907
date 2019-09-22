const { models: { Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieve all article of a category.
 * 
 * @param {String} category - Category to retrieve articles.
 * 
 * @returns {Promise} - Returns a Promise with all articles inside the category.
*/

module.exports = function(category) {

    validate.string(category, 'category')

    return (async () => {
        
        const articles = await Article.find({category: category} ,{ __v: 0 }).sort({ref:1}).lean()
        if (articles.length === 0) throw Error(`There aren\'t any articles in the category: ${category}`)    
        
        articles.forEach(article => {
            article.id = article._id.toString()
            delete article._id
        })
        
        return articles

    })()
}