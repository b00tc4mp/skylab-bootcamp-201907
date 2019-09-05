const validate = require('../../../utils/validate')
const { User } = require('../../../models')

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
        const user=await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
             if (!user) throw Error(`User with id ${id} does not exist.`)
    })()
   /*  return User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        .then(user => {
             if (!user) throw Error(`User with id ${id} does not exist.`)
        }) */
}