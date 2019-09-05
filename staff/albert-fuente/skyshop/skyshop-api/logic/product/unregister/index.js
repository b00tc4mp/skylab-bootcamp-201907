const {validate} = require('skyshop-utils')
const { models:{Product} } = require('skyshop-data')

/**
 * Unregisters a user by their id
 * 
 * @param {string} productId
 * 
 * @returns {Promise}
*/


module.exports = function(productId) {   
    return(async()=>{

            const product = await Product.deleteOne({_id:productId})
            if (!product) throw Error(`Product with id ${productId} does not exist.`)

    })()
}


