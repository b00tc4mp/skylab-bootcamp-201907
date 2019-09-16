const {validate} = require('skyshop-utils')
const {models:{Auction, User}}=require('skyshop-data')

/**
 * @param {*} auctionId
 * @param {*} userId
 * @param {*} fieldsToUpdate
 * 
 * @returns {Promise}
 */

 module.exports=function(userId, auctionId,price){
    //todo validate.string(auctionId, 'productId')
    
    return (async ()=>{
    const user=await User.findOne({_id:userId})
    
    if (!user) throw Error(`User with id ${userId} does not exist.`)

    if(!price)throw Error('No field to update price provided')
    
    const auction=await Auction.findOne({_id:auctionId})
    auction.price = price
    auction.owner = userId    
    auction.save()

    /* 
    const auction=await Auction.findOneAndUpdate(auctionId, { $set: {price: price} })
    if (!auction) throw Error(`Auction with id ${auctionId} does not exist.`) */


    })()
    

 }