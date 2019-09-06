const { models: { Product, User, Order, Item } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * 
 * @param {*} userId 
 * @param {*} productId 
 * 
 * @returns {Promise}
 */

module.exports = function(userId, productId, quantity) {
    validate.string(userId, 'userId')
    return (async () => {
        const user = await User.findById(userId)
        debugger

        if (!user) throw Error('TODO')

        let item = user.cart.find(item => item.product.toString() === productId)
        
        if (item) item.quantity += quantity
        else {
            item = new Item({product: productId, quantity})
            user.cart.push(item)
        }
        await user.save()
    })()
}

