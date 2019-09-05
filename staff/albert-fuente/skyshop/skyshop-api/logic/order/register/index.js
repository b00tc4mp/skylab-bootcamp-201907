const validate = require('../../../utils/validate')
const { Order,Product } = require('../../../models')

/**
 * 
 * @param {*} date 
 * @param {*} state 
 * 
 * @returns {Promise}
 */

module.exports = function(id,products) {
    //products array de IDs


     return(async()=>{
         
        const product=await product.findOne({_id:productId}).lean()
         

        const order = await new Order({ id, products })
        order.owners=id
        order.date=new Date()
        const response= await order.save()
        return response._id.toString()

    })() 
}   