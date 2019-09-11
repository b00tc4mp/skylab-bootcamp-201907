const { models:{Product} } = require('skyshop-data')
/**
 * 
 * 
 * @returns {Promise}
 * 
*/

module.exports = function () {
    
    return (async () => {
        const product = await Product.find({}, {password: 0 }).lean()

        if (!product) throw Error(`No products available`)
        return await product
    })()
}