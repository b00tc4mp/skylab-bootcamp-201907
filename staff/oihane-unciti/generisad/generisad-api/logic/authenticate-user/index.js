const { models: { User, Merchant } } = require('generisad-data')
const bcrypt = require('bcryptjs')
const { validate } = require('generisad-utils')

 /**
 * 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
*/

module.exports = function(email, password, domain) {
   
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(domain, 'domain')
    
    return (async () => {

        const merchant = await Merchant.findOne({ domain })
        let merchant_id = merchant._id
    

        const user = await User.findOne({ email : email, merchant_owner : merchant_id })

        if(!user) throw new Error (`user with email ${email} does not exist`)

        const match = await bcrypt.compare(password , user.password)

        if(!match) throw new Error ('wrong credentials')
        
        return user.id
    })()
}
