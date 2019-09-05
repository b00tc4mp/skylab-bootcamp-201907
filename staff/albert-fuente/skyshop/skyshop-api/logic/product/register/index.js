debugger
const {validate} = require('skyshop-utils')
const {models:{Product}}=require('skyshop-data')

/**
 * 
 * 
 * @param {*} title
 * @param {*} image
 * @param {*} description
 * @param {*} size
 * @param {*} color
 * @param {*} price
 * 
 * @returns {Promise}
 */

 module.exports=function(title,image,description,size,color,price){
     let _user
     validate.string(title,'title')
     validate.string(image,'image')
     validate.string(description,'description')
     //validate.string(size,'size')
     validate.string(color,'color')
     validate.number(price,'price')

     return(async()=>{
         const product=await new Product({title,image,description,size,color,price})
         const response=await product.save()
         return response.id.toString()

     })()

 }