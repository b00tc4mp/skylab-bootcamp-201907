const { Item } = require('../../../models')
const validate = require('../../../utils/validate')
/**
 * Unregisters an item.
 * 
 * @param {string} id
 * 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    debugger
    validate.string(id, 'id')

    return(async()=>{
        const result=await Item.deleteOne({ _id: id })
            if (!result) throw new Error(`Product with id ${id} does not exist.`)
    })()

}