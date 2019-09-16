const {validate} = require('skyshop-utils')
const { models:{Product} } = require('skyshop-data')
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
     
        const product = await Product.find({title:query},{ password: 0 })
        if (!product) throw Error(`Product with title ${title} does not exist.`)
        return product
    })()
}