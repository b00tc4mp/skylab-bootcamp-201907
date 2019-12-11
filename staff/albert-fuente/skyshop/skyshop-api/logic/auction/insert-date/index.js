const {validate} = require('skyshop-utils')
const {models:{Auction, User}}=require('skyshop-data')

/**
 * Inserts a second date 
 * 
 * @param {*} auctionId
 * @param {*} userId
 *  
 * @returns {Promise}
 */

 module.exports=function(userId, auctionId){
    //todo validate.string(auctionId, 'productId')
    debugger
    return (async ()=>{
    const user=await User.findOne({_id:userId})
    
    if (!user) throw Error(`User with id ${userId} does not exist.`)
    debugger
    const auction=await Auction.findOne({_id:auctionId})
    const date=await new Date()
    auction.date2 = date    
    auction.save()

    /* 
    const auction=await Auction.findOneAndUpdate(auctionId, { $set: {price: price} })
    if (!auction) throw Error(`Auction with id ${auctionId} does not exist.`) */


    })()
    

 }