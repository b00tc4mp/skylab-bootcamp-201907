const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')
const bcrypt = require('bcryptjs')

/**
 * Registers a user.
 * 
 * @param {string} company 
 * @param {string} country 
 * @param {string} email 
 * @param {string} password
 * @param {string} role
 * 
 * @returns {Promise}
 */
module.exports = function (id, company, country, email, password, role) {
    validate.string(company, 'company')
    validate.string(country, 'country')
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')
    validate.string(role, 'role')
    validate.string(id, 'id')

    return (async () => {

        const res = await User.findOne({_id: id})
        
        if (!res) throw new Error(`TODO`)

        const hash = await bcrypt.hash(password, 10)

            if(res.role === 'admin'){
            
                const result = await User.findOne({ email })
        
                if (result) throw new Error(`user with e-mail ${email} already exists`)

                const user = await User.create({ company, country, email, password: hash, role })
                user._id = user.id
                
                return user

            } else {
                throw new Error(`User with id ${id} is not an admin`)
            }
        
    })()
}