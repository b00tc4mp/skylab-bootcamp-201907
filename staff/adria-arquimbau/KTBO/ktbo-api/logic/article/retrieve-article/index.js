const { models: { Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieve all information of an article.
 * 
 * @param {String} id - Indentifier of an article.
 * 
 * @returns {Promise} - Return a Promise with all params of an article.
*/

module.exports = function(id) {

    validate.string(id, 'id')

    return (async () => {
        
        const article = await Article.findOne({ _id: id }, { _id: 0, __v: 0 }).sort({ref: 1}).lean()
        if (!article) throw Error(`article with ref ${id} does not exist`)    
        
        article.id = id

        return article

    })()
}