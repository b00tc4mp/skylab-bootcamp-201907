const { models: { Product, User, Order, Item } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * 
 * @param {*} userId 
 * 
 * 
 * @returns {Promise}
 */

module.exports = function(userId) {
    validate.string(userId, 'userId')
    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)
        const orders = await Order.find({ owner: userId}, { __v: 0 }).sort({ _id: 1 }).lean()
        if(!orders) throw new Error(`Order with id ${orderId} not exist`)
        
        orders.forEach(order => {
            order.id = order._id.toString()
            delete order._id
        })
        if( orders.length === 0 ) {
            throw new Error(`User with id ${userId} do not have any orders`)
        } else {
            return orders
        }
    })()
/*     return (async () => {
        const user = await User.findById(userId)
        debugger

        if (!user) throw Error('User does not exist')

        const orders = await Order.find({ owner: userId}, { __v: 0 }).sort({ _id: 1 }).lean()
        if(!orders) throw Error('No orders available')

        orders.forEach(items=>{
            items.id=items._id.toString()
            delete items._id
           
        })

        return orders
    })() */

}

