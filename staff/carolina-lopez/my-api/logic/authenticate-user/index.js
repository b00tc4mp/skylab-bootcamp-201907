const validate = require('../../utils/validate')

/**
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */

module.exports = function (email, password) {
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    
    return this.__users__.findOne({ email })
        .then(user => {
            if (!user) throw new Error(`user with e-mail ${email} does not exist`)

            if (user.password !== password) throw new Error(`wrong credentials`)

            return user._id.toString()
        })
}
