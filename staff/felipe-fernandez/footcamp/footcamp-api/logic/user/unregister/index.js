const {validate} = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')
 

/**
 * Unregisters a user by their email
 * 
 * @param {string} id 
 * @param {string} email
 * 
 * 
 * @returns {Promise}
*/
module.exports = function(id, email) {

    validate.string(id, 'id')
    validate.string(email, 'email')
    validate.string(password, 'password')
    
    return (async()=>{
        const user =  await User.deleteOne({ _id: id, email })
        if (!user.deletedCount) throw Error(`There was an error unregistering the user`)
       
    })()

}