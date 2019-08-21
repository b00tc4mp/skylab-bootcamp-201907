const validate = require('../../utils/validate')
module.exports = {
    /**
     * Authenticates a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise}
     */

    authenticateUser(email, password) {
        validate.str(email , 'email')
        validate.email(email , 'email')
        validate.str(password , 'password')
        

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user) throw new Error(`user with e-mail ${email} does not exist`)
                if (user.password !== password) throw new Error(`Wrong credentials`)

                return user._id.toString()
            })
    }
}