const validate = require('../../utils/validate')


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
    validate.string(password, 'password')

    return this.__users__.findOne({ email })
        .then(response => {
            if (response) throw Error('User already exists.')
            this.__users__.insertOne({ name, surname, email, password })
        }).then(() => { })
}