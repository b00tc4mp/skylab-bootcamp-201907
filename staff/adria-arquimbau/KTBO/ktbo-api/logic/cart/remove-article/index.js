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

module.exports = function(userId, articleId) {

    validate.string(userId, 'userId')
    validate.string(articleId, 'articleId')
   
    return (async () => {
        
        const user = await User.findById(userId)

        if (!user) throw Error(`User with id ${userId} does not exist`)
        
        if (user.cart.length === 0) throw Error(`User with id ${userId} does not have any article in his cart`)

       /*  user.cart.forEach(element => {
            if(element.article.toString() != articleId){
                throw new Error(`User with id ${userId} does not have any article with id ${articleId} in his cart`)
            }
        }) */
        const article = await Article.findById(articleId)

        if (!article) throw Error(`Article with id ${userId} does not exist`)

        let item = user.cart.findIndex(item => { 
            
            return item.article.toString() === articleId
            
         })
        if (item > -1) await user.cart.splice(item,1)
        if (item <0) throw Error(`User with id ${userId} does not have any article with id ${articleId} in his cart`)
        
        await user.save()

    })()
}


