const { models } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')
const bcrypt = require('bcryptjs') 
const { User } = models

/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
 */

module.exports = function (name, surname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username')

    return (async () => {
        const user = await User.findOne({ email })
        
        if (user) throw Error('User already exists.')

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, password: hash })

        return user
    })()
}