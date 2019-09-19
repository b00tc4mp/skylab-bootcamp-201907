const { models: { Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * 
 * @param {*} ref 
 * 
 * @returns {Promise}
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