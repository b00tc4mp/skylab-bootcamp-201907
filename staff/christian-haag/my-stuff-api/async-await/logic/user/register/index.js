const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.email(email, 'username')


    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new Error(`user with e-mail ${email} already exists`)

        const create = await User.create({ name, surname, email, password })
        return create

    })()
}