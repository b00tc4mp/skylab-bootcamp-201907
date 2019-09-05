const {validate} = require('skyshop-utils')
const { models:{User} } = require('skyshop-data')

 /**
 * 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
*/

module.exports = function(email, password) {
   
    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    return(async()=>{
        const user=await User.findOne({ email, password })
            if (!user) throw Error('Wrong credentials.')
            return await user._id.toString()
    })()


}
