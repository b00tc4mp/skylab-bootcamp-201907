const validate = require('../../utils/validate')

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
module.exports = function (name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.string(password, 'password')
    
    return this.__users__.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)
                
            return this.__users__.insertOne({ name, surname, email, password })
        })
        .then(() => { })
}
