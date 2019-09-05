const validate = require('../../../utils/validate')
const { Product } = require('../../../models')
/**
 * 
 * 
 * @param {*} title 
 * @returns {Promise}
 * 
*/

module.exports = function ( query) {
    validate.string(query, 'query')
    return (async () => {
     
        const product = await Product.find({title:query},{ _id: 0, password: 0 })
        if (!product) throw Error(`Product with title ${title} does not exist.`)
        return product
    })()
}