const { models: { Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * 
 * @param {*} category 
 * 
 * @returns {Promise}
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