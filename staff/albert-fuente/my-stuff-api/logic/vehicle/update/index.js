const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'id')
    return(async()=>{
        const vehicle=await Vehicle.findByIdAndUpdate(id, { $set: fieldsToUpdate })
             if (!vehicle) throw Error(`Vehicle with id ${id} does not exist.`)
    })()

     
}