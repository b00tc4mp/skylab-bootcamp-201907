const { models: { User, Item } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * 
 * @param {*} userId 
 * @param {*} productId 
 * @param {*} quantity 
 * 
 * 
 * @returns {Promise}
 */

module.exports = function(userId, productId, quantity) {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')
    validate.number(quantity, 'quantity')

    return (async () => {
        const user = await User.findById(userId)
        debugger

        if (!user) throw Error(`User with id ${userId} does not exist`)

        let item = user.cart.find(item => item.product.toString() === productId)
        
        if (item) item.quantity += quantity
        else {
            item = new Item({product: productId, quantity})
            user.cart.push(item)
        }
        await user.save()
    })()
}

