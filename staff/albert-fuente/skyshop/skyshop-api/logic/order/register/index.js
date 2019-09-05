const {validate} = require('skyshop-utils')

const { models:{Order }} = require('skyshop-data')

/**
 * 
 * @param {*} ownerId 
 * @param {*} itemId 
 * 
 * @returns {Promise}
 */

module.exports = function(ownerId,itemId) {
    validate.string(ownerId,"ownerId")
    validate.array(itemId,"itemId")
    
     return(async()=>{
       const order = await new Order()
        order.date=new Date()
        order.owners=ownerId
        order.items.push(itemId)
        const response= await order.save()
        return response

    })() 
}   