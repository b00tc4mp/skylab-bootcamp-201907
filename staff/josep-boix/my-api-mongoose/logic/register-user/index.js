/**
 * Register an user
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @param {string} repassword
 * 
 * @return {Promise}
 */
const validate = require ('../../utils/validate')
const {User} = require ('../../data')

module.exports = function (name, surname, email, password, repassword) {
    validate.string (name, 'name')
    validate.string (surname, 'surname')
    validate.string (email, 'email')
    validate.email (email, 'email')
    validate.string (password, 'password')
    validate.string (repassword, 'repassword')

    if (password !== repassword) throw Error ('passwords do not match.')

    return User.findOne({email})
        .then (user => {
            if (user) throw Error (`User with email ${email} already exists.`)

            return User.create({name, surname, email, password})
        })
        .then (() => { })
}