const {
    models: {
        Article,
        User,
        Order,
        Item
    }
} = require('ktbo-data')
const {
    validate
} = require('ktbo-utils')

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

module.exports = function (userId) {

    validate.string(userId, 'userId')

    return (async () => {

        const user = await User.findById(userId)

        if (!user) throw Error(`User with id ${userId} does not exist`)

        const cart = user.cart

        if (cart.length === 0) throw new Error(`Your cart is empty`)

        let date = new Date()

        date = date.toString() 
            try {
                
                const  stockArticles = await Promise.all(user.cart.map(element => Article.findById(element.article)))
                user.cart.map( cartArticle => {                  
                    
                    
                    let index = stockArticles.findIndex(article => {
                        
                        return article.id === cartArticle.article.toString()
                    })
                    if (cartArticle.quantity > stockArticles[index].quantity) { 
                        
                        throw Error('Stock greater than quantity required')
                    } else {
                         
                        stockArticles[index].quantity = stockArticles[index].quantity - cartArticle.quantity
                     
                    }                
                })               
                await Promise.all(stockArticles.map(article => article.save()))
                const order = await Order.create({
                    date,
                    owner: userId,
                    items: user.cart
                })
                
                user.cart = undefined
                await user.save()
                
                return order

            } catch ({ message }) {
                throw Error(message)
            }


       
    })()
}