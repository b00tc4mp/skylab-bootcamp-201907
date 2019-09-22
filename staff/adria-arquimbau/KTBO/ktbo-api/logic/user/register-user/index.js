const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')
const bcrypt = require('bcryptjs')

/**
 *  Register a new User / Company.
 *  Required a is of an admin for formalize the register.
 *
 * @param {String} id - Identifier of the admin user performing the register.
 * @param {String} company - Name of the Company
 * @param {String} country - Country of the Company
 * @param {String} email
 * @param {String} password
 * @param {String} role - Role for the functionality of the new User - enum = ('admin', 'regular').
 * 
 * @returns {Promise} - Returns a Promise with the created user.
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