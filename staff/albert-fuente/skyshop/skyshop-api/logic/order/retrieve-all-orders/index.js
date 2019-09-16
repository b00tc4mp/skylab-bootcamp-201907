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
        
        if(user.isAdmin){
            
            const orders = await Order.find({ __v: 0 }).populate('owner').populate('items.product').sort({ _id: 1 }).lean()
            if(!orders) throw Error('No orders available')

            orders.forEach(items=>{
                items.id=items._id.toString()
                delete items._id
            
            })

            return orders

        }
        else{
            throw Error('You have no admin rights')
        }
    })() 

}

