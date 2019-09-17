const { models: { User } } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')
const bcrypt = require('bcryptjs') 


 /**
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
*/

module.exports = function(email, password) {
   
    validate.string(email, 'email')
    validate.email(email, 'email')
    // validate.string(password)

    return (async () => {

        const user =  await User.findOne({ email })

        if(!user) throw new Error(`user with e-mail ${email} does not exist`)
            
        const match = await bcrypt.compare(password, user.password)

        if(!match) throw new Error('wrong credentials')
    
        return user.id
    })()
}
