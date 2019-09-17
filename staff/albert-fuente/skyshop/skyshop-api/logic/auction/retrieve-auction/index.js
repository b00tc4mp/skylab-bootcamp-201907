const {validate} = require('skyshop-utils')
const { models:{Auction} } = require('skyshop-data')
/**
 * Retrieves an auction
 *  
 * @param {*} auctionId 
 * 
 * @returns {Promise}
 * 
*/

module.exports = function ( auctionId) {
    validate.string(auctionId, 'Product ID')
    return (async () => {

        const auction = await Auction.findOne({_id:auctionId}, { _id: 0, password: 0 }).populate('owner')
        if (!auction) throw Error(`Auction with id ${auctionId} does not exist.`)
        return auction
    })()
}