const { Product } = require('../../../models')
/**
 * 
 * 
 * @returns {Promise}
 * 
*/

module.exports = function () {
    
    return (async () => {
        const product = await Product.find({}, { _id: 0, password: 0 }).lean()

        if (!product) throw Error(`No products available`)
        return await product
    })()
}