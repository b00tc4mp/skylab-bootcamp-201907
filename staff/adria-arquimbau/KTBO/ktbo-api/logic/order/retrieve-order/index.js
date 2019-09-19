const { models: {  User, Order } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * 
 * @param {*} userId 
 * @param {*} orderId 
 * 
 * @returns {Promise}
 */

module.exports = function(userId, orderId) {

    validate.string(userId, 'userId')
    validate.string(orderId, 'orderId')
    
    return (async () => {



        const user = await User.findById(userId)

        if (!user) throw Error(`User with id ${userId} does not exist`)

        const order = await Order.find({ _id: orderId }, { __v: 0 }).lean()

        order.forEach(items => {
            items.id = items._id.toString()
        delete items._id 
        })
        
        if(!order) throw new Error(`Order with id ${orderId} not exist`)

        owner = order[0].owner

        if(owner.toString() === userId)  {
            return order
        } else {
            throw new Error(`Order owner do not corresponds with user id ${userId}`)
        }
    })()
}


