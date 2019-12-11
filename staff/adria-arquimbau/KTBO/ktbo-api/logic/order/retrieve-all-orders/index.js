const { models: { User, Order} } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 *  Retrieve all orders.
 *  Function reserved for administrators.
 * 
 * @param {String} userId - Identifier of the admin.
 * 
 * @returns {Promise} - Returns a Promise with all orders.
 */

module.exports = function(userId) {

    validate.string(userId, 'userId')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${id} does not exist`)

        if(user.role === 'admin'){
            
            const orders = await Order.find({ __v: 0 }).sort({ _id: -1 }).populate("owner items.article ").lean()
            //TODO si esta vacio peta el populate, llamar find sin populate i si tiene owner hacer find con populate
            orders.forEach(order => {
                order.id = order._id.toString()
                delete order._id
            })
    
            if(!orders) throw new Error(`Order with id ${orderId} not exist`)
     
            return orders
                   
        } else {
            throw new Error(`User with id ${userId} is not an admin`)
        }
    })()
}


