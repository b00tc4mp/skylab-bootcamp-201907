const { models: { Article, User, Order, Item } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * 
 * @param {*} ref 
 * @param {*} title 
 * @param {*} description 
 * @param {*} img 
 * @param {*} quantity 
 * @param {*} category 
 * 
 * @returns {Promise}
 */

module.exports = function(userId, articleId, quantity) {
    quantity = Number(quantity)
    validate.string(userId, 'userId')
    validate.string(articleId, 'articleId')
    validate.number(quantity, 'quantity')
    
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw Error(`User with id ${userId} does not exist`)

        const article = await Article.findById(articleId)
        
        if(article.quantity < quantity) throw Error('Stock greater than quantity required')

        let item = user.cart.find(item => item.article.toString() === articleId)

        item ? item.quantity += quantity : user.cart.push(new Item({article: articleId, quantity}))

        await user.save()

        const user1 = await User.findById(userId)

        let item1 = user1.cart.find(item => item.article.toString() === articleId)

        if(item1.quantity<0) item1.quantity=0

        await user1.save()

        return user1.cart
    })()
}




