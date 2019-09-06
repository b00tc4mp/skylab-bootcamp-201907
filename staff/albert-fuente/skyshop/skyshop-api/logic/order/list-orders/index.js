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
        debugger

        if (!user) throw Error('User does not exist')

        const orders=await Order.find({})
        if(!orders) throw Error('No orders available')

        orders.forEach(items=>{
            items.id=items._id.toString()
            delete items._id
           
        })

        return orders
    })()
}

