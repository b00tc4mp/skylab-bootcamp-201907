const { models: {  User, Order } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 *  Change the status of a pending order to closed.
 *  Function reserved for administrators.
 * 
 * @param {String} userId - Identifier of the admin.
 * @param {String} orderId - Identifier of the order to change.
 * 
 * @returns {Promise} - Returns a promise with a feedback and the all order params.
 */

module.exports = function(userId, orderId) {

    validate.string(userId, 'userId')
    validate.string(orderId, 'orderId')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)
        
        if(user.role === 'admin'){

            const order = await Order.findOne({ _id: orderId })
            if(!order) throw new Error(`Order with id ${orderId} not exist`)
            owner = order.owner
    
            if(order.state === 'closed') throw Error('Already Closed order')

            order.state = 'closed'

            await order.save()

            return order
      
        } else {
            throw new Error(`User with id ${userId} is not an admin`)
        }
       
    })()
}


