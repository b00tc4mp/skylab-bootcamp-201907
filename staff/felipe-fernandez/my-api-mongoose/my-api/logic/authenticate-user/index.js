const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

/**
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */


 module.exports = function(email, password) {
        // TODO validate fields
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user || user.password !== password) throw new Error(`user with e-mail ${email} does not exist`)

                return user._id.toString()
            })
    }
