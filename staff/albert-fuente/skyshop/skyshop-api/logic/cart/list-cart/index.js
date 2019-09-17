const { models: { User, Item } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * Retrieves the cart
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
        if (!user) throw Error(`User with id ${userId} does not exist`)
        const { cart } = await User.findById(userId).populate('cart.product').lean()

        return cart

    })()
}

