const {validate} = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')
 
/**
 * Update user informtaion
 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'id')
  
    return (async () => {

        const user = await User.findByIdAndUpdate(id, { $set: fieldsToUpdate})

        if (!user) throw Error(`User with id ${id} does not exist.`)

              
    })()
}