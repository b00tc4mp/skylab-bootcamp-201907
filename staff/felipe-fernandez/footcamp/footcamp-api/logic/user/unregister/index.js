const {validate} = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')
 


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
    return (async()=>{
        const user =  await User.deleteOne({ _id: id, email, password })
        if (!user.deletedCount) throw Error(`There was an error unregistering the user`)
       
    })()
    
}