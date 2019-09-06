const {validate} = require('skyshop-utils')

const { models:{Order,Item }} = require('skyshop-data')

/**
 * 
 * @param {*} userId 
 * @param {*} itemId 
 * 
 * @returns {Promise}
 */

module.exports = function(userId,productId,quantity) {
    validate.string(userId,"ownerId")

    return(async()=>{
    const response=await Order.findOne({owner:userId},{state:'open'})
    debugger

    if(!response){        
        const res=await new Item({product:productId, quantity })
        item=res
        const order=await Order.create({owner:userId}).lean()
        order.items.push(item)   
        /* order.id=order._id.toString()
        delete order._id */
        await order.save()
    }
    else{
        const res=await new Item({productId, quantity })
        item=res
        response.items.push(item)
        await response.save()    
    }     
    })() 
}   










///// FUNCTION  05/09 
/* const {validate} = require('skyshop-utils')

const { models:{Order,User }} = require('skyshop-data')

/**
 * 
 * @param {*} ownerId 
 * @param {*} itemId 
 * 
 * @returns {Promise}
 */

/* module.exports = function(state,userId,items) {
    validate.string(userId,"ownerId")
    validate.string(state,'state')
    validate.date(date,'date')

     return(async()=>{
        
       const res = await Order.find({'owner':userId})
       if(!res){
           const order= await Order.create({state,userId,items})
           order.date=new Date()
           order.id=order._id.toString()
           delete order._id
           return order
       }


        order.status="initialized"
        
        order.owners=ownerId
        order.items.push(itemId)
        const response= await order.save()
        return response

    })() 
}     */