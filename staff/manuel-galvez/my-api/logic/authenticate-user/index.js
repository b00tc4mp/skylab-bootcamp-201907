const validate = require('../../utils/validate')
module.exports = {
    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */

    authenticateUser(email, password) {
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')

        return this.__users__.findOne({ email, password })
            .then(response => {
                if (!response) throw Error('Wrong credentials.')
                return response._id.toString()
            })
    }
}
