const {validate} = require('skyshop-utils')
const { models:{Auction} } = require('skyshop-data')
/**
 * 
 *  
 * @param {*} auctionId 
 * @returns {Promise}
 * 
*/

module.exports = function ( auctionId) {
    validate.string(auctionId, 'Product ID')
    return (async () => {

        const auction = await Auction.findOne({_id:auctionId}, { _id: 0, password: 0 })
        if (!auction) throw Error(`Auction with id ${auctionId} does not exist.`)
        return auction
    })()
}