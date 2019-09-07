const {validate} = require('skyshop-utils')
const { models:{User} } = require('skyshop-data')
const bcrypt = require('bcryptjs')

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
        const user=await User.findOne({ email })
            if (!user) throw Error('Wrong credentials.')
            
            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

            return await user._id.toString()
    })()


}
