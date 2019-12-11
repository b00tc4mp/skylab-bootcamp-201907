const { models: { Article, User, Order, Item } } = require('ktbo-data')
const { validate } = require('ktbo-utils')


/**
 *  This function adds an item with a quantity to the user's cart
 *
 * @param {String} userId - Identifier of the user.
 * @param {String} articleId - Identifier of article to add.
 * @param {Quantity} quantity - Quantity of the 'articleId' to add.
 * 
 * @returns {Promise}
 */

module.exports = function(userId, articleId, quantity) {

    quantity = Number(quantity)
    validate.string(userId, 'userId')
    validate.string(articleId, 'articleId')
    validate.number(quantity, 'quantity')
    
    return (async () => {

        const res = await User.findById(userId)
        if (!res) throw Error(`User with id ${userId} does not exist`)

        const article = await Article.findById(articleId)
        if(article.quantity < quantity) throw Error('Stock greater than quantity required')

        let item = res.cart.find(item => item.article.toString() === articleId)
        item ? item.quantity += quantity : res.cart.push(new Item({article: articleId, quantity}))

        await res.save()

        const user = await User.findById(userId)
        let item1 = user.cart.find(item => item.article.toString() === articleId)

        if(item1.quantity<0) item1.quantity=0

        await user.save()

        return user.cart

    })()
}