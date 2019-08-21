const validate = require('../../utils/validate')

module.exports = {
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
    registerUser(name, surname, email, password, repassword) {

        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')
        validate.string(repassword, 'password repeat')

        return this.__users__.findOne({ email })
            .then(response => {
                if (response) throw Error('User already exists.')
                this.__users__.insertOne({ name, surname, email, password })
            }).then(() => { })
    }
}