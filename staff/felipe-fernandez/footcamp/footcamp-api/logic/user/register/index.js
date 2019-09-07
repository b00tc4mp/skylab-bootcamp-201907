const {validate} = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')
const bcrypt = require('bcryptjs')

/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
 */

module.exports = function(name, surname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return ( async () => {
        const user = await User.findOne({ email })

        if (user) throw Error('User already exists.')

        const hash = await bcrypt.hash(password,10)
        
        await User.create({ name , surname ,  email , password : hash })
        
    })()
}