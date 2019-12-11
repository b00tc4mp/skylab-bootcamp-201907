const { models:{Product} } = require('skyshop-data')

/**
 * Retrieves all products
 * 
 * @returns {Promise}
 * 
*/

module.exports = function () {
    
    return (async () => {
        const product = await Product.find({}, {password: 0, __v: 0} ).lean()

        if (!product) throw Error(`No products available`)
        return await product
    })()
}