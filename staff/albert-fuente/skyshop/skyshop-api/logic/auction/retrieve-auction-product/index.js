const {validate} = require('skyshop-utils')
const { models:{Auction} } = require('skyshop-data')
/**
 * Retrieves an auction based on productId
 *  
 * @param {*} productId 
 * @returns {Promise}
 * 
*/

module.exports = function ( productId) {
    validate.string(productId, 'Product ID')
    return (async () => {
        const allAuctions=await Auction.find({})
        debugger
        if (!allAuctions) throw Error(`There are no auctions.`)
        //return allAuctions[0].product
        let result=false
        result=allAuctions.find(({product})=> {
            return product.toString()===productId
        })
        if(result){return result}else{return false}

    })()
}