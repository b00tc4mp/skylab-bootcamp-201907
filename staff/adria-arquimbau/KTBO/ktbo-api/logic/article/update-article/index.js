const { models: { User, Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Updates a article.
 * 
 * @param {string} articleId - Identifier of the article.
 * @param {Object} body - Object with the all info to update.
 * 
 */

module.exports = function (articleId, body) {

    const { ref, title, description, img, quantity, category, price  } = body

    validate.string(articleId, 'articleId')
    validate.number(ref, 'ref')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(img, 'img')
    validate.number(quantity, 'quantity')
    validate.string(category, 'category')    
    validate.number(price, 'price')

    return (async () => {

        const article = await Article.findByIdAndUpdate(articleId, { $set: body })
        if (!article) throw new Error(`article with id ${articleId} does not exist`)

    })()
}