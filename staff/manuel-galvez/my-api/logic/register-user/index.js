const validate = require('../../utils/validate')
module.exports = function(name, surname, email, password) {
    /**
     * 
     * @param {*} name 
     * @param {*} surname 
     * @param {*} email 
     * @param {*} password 
     * @param {*} repassword 
     * 
     * @returns {Promise}
     */

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')
    
    return this.__users__.findOne({ email })
        .then(response => {
            if (response) throw Error('User already exists.')
            return this.__users__.insertOne({name, surname, email, password})
        }).then(() => {})
}