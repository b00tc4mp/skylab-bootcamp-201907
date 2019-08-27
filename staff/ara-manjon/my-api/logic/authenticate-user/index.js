const {
    validate
} = require('../../utils')

/**
       * Authenticates a user by its credentials.
       * 
       * @param {string} email Email introduced by user
       * @param {string} password Password introduced by user
       * 
       * @returns {Promise}
       * 
       * Returns the user id.
       */
module.exports = function (email, password) {
    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    return this.__users__.findOne({ email })
        .then(user => {
            if (!user) throw new Error(`user with e-mail ${email} does not exist`)

            if (user.password !== password) throw new Error('wrong credentials.')

            return user._id.toString()
        })
}