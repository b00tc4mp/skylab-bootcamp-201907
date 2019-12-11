const { models: {  User, Order } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 *  Retrieve order of a user.
 * 
 * @param {String} userId - Identifier of the user.
 * 
 * @returns {Promise} - Returns a Promise with params of a order.
 */

module.exports = function(userId, orderId) {

    validate.string(userId, 'userId')
    validate.string(orderId, 'orderId')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)

        const order = await Order.find({ _id: orderId }, { __v: 0 }).lean()
        if(!order) throw new Error(`Order with id ${orderId} not exist`)

        order.forEach(items => {
            items.id = items._id.toString()
        delete items._id 
        })
        
        owner = order[0].owner

        if(owner.toString() === userId)  {
            return order
        } else {
            throw new Error(`Order owner do not corresponds with user id ${userId}`)
        }
        
    })()
}


