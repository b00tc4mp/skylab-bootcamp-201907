const { models: { User, Order} } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 *  Retrieve all pending orders.
 *  Function reserved for administrators.
 * 
 * @param {String} userId - Identifier of the admin.
 * 
 * @returns {Promise} - Returns a promise with all pending orders.
 */

module.exports = function(userId) {

    validate.string(userId, 'userId')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)

        if(user.role === 'admin'){
            
            const orders = await Order.find({ state: 'pending' }, { __v: 0 }).sort({ _id: -1 }).populate("owner items.article").lean()
            if(!orders) throw new Error(`Order with id ${orderId} not exist`)
             
            orders.forEach(order => {
                order.id = order._id.toString()
            delete order._id
            })
    
            return orders
           
        } else {
            throw new Error(`User with id ${userId} is not an admin`)
        }
    })()
}


