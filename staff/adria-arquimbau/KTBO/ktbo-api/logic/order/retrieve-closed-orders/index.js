const { models: { User, Order} } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 *  Retrieve all closed orders.
 *  Function reserved for administrators.
 * 
 * @param {String} userId - Identifier of the admin.
 * 
 * @returns {Promise} - Returns a promise with all closed orders.
 */

module.exports = function(userId) {

    validate.string(userId, 'userId')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${id} does not exist`)

        if(user.role === 'admin'){
            
            const orders = await Order.find({ owner: userId }, { __v: 0 }).sort({ _id: 1 }).lean()
            if(!orders) throw new Error(`Order with id ${orderId} not exist`)

            orders.forEach(order => {
                order.id = order._id.toString()
            delete order._id
            })
    
            owner = orders[0].owner
    
            if(owner.toString() === userId)  {
                return orders
            } else {
                throw new Error(`Order owner do not corresponds with user id ${userId}`)
            }           

        } else {
            throw new Error(`User with id ${userId} is not an admin`)
        }
    })()
}


