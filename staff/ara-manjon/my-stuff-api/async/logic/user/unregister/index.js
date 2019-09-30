const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * @param {string} email
 * @param {string} password 
 * 
 * @returns {Promise}
*/
module.exports = function(id, email, password) {
    validate.string(id, 'id')
    validate.string(email, 'email')
    validate.string(password, 'password')
    return(async ()=>{
        const result = await User.deleteOne({ _id: id, email, password })
        if (!result.deletedCount) throw Error('wrong credentials')
    })()        
}