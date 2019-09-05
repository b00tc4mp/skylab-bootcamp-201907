const validate = require('../../../utils/validate')
const { Item } = require('../../../models')

/**
 * @param {*} id 
 * @param {*} quantity 
 * 
 * @returns {Promise}
 */

module.exports = function(id,quantity) {
    validate.string(id, 'id')
    validate.number(quantity, 'quantity')

    return(async()=>{
        const response = await Item.findOne({ id })
        if (response) throw new Error(`Product ${id} already exists.`)
        const item = new Item({ quantity })
        item.product=id
        await item.save()
        
        return item._id.toString()
    })()
    

}




