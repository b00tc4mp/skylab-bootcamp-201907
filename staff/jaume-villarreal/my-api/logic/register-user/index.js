const validate = require('../../utils/validate')

module.exports = {
    /**
     * Registers a user.
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} repassword 
     * 
     * @returns {Promise}
     */
    registerUser(name, surname, email, password, repassword) {
        validate.str(name , 'name')
        validate.str(surname , 'surname')
        validate.email(email , 'email')
        validate.str(password , 'password')

        if (password !== repassword) throw new Error('passwords do not match')

        return this.__users__.findOne({ email })
            .then(user => {
                if (user) throw new Error(`user with e-mail ${email} already exists`)

                return this.__users__.insertOne({ name, surname, email, password })
            })
            .then(() => { })
    }
}