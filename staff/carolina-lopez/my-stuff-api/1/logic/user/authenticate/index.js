const validate = require('../../../utils/validate')
const { User } = require('../../../models')

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
    validate.string(password)

    return (async () => {
        const user =  await User.findOne({ email })

        if(!user) throw new Error(`user with e-mail ${email} does not exist`)
            
        if (user.password !== password) throw Error('wrong credentials')
    
        return user.id
    })()
}
