const { models: { Product, User, Order, Item } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * 
 * @param {*} userId 
 * @param {*} orderId 
 * 
 * @returns {Promise}
 */

module.exports = function(userId,orderId) {
    validate.string(userId, 'userId')
    validate.string(orderId, 'orderId')
/*     return (async () => {
        const user = await User.findById(userId)
        debugger

        if (!user) throw Error('User does not exist')


        const order=await Order.find({_id:orderId},{__v:0}).lean()
        if(!order) throw Error('Order does not exist')

        order.forEach(items=>{
            items.id=items._id.toString()
            delete items._id
           
        })

    
        return order
    })() */

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

