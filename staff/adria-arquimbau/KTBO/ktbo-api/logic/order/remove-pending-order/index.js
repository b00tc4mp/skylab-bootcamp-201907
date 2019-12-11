const { models: {  User, Order, Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 *  Delete a pending order.
 *  Function reserved for administrators.
 * 
 * @param {String} userId - Identifier of the admin.
 * @param {String} orderId - Identifier of the order to delete.
 * 
 */

module.exports = function(userId, orderId) {

    validate.string(userId, 'userId')
    validate.string(orderId, 'orderId')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)
        
        if(user.role === 'admin'){
            
            const orders = await Order.findOne({ state: 'pending', owner: userId, _id: orderId })
            if(!orders) throw new Error(`Order with id ${orderId} not exist`)

            if(userId === orders.owner.toString()){

            orders.items.forEach(async element => {
                        
                quantity = element.quantity
        
                const article = await Article.findById(element.article)
                if(!article) throw new Error(`Article with id ${element.article} not exist`)

                article.quantity += quantity
                
                await article.save()  
            })     

            const res = await Order.deleteOne({ _id: orderId })
            if(res.deletedCount === 0) throw Error('Error')    

            } else {
                throw new Error(`User with id ${userId} is not an admin`)
            }
            
        }
    })()
}