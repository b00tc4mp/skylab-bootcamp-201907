const { models: { User, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')
const bcrypt = require('bcryptjs')

/**
  * Register user by the email and by domain.
 * 
 * 
 * @param {String} name 
 * @param {String} surname 
 *  @param {String} email 
 * @param {String} password 
 * @param {String} domain
 * 
 * @throws {TypeError} - if id is not a string.
 * @throws {Error} - if user already exist in this domain .
 * 
 * @returns {Promise}
 * @returns {} empty object
*/

module.exports = function(name, surname, email, password, domain) {
    
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(domain, "domain")

    return(async ()=>{


        const merchant = await Merchant.findOne({ domain })

        let merchant_id = merchant._id
        
        const user = await User.find({ email, merchant_owner : merchant_id })
            
        if(user.length > 0) throw new Error (`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password,10)
        
        await User.create({ name , surname ,  email , password : hash , merchant_owner : merchant_id})

        return { }
     })()

}