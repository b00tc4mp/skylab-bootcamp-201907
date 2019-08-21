const validate = require('../../utils/validate')

module.exports = {
/**
 * Authenticates a user by its credentials.
 * 
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
 */

/*     authenticateUser(email, password) {
        let data= {}
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')

        return this.__users__.findOne({ email, password })
            .then(user => {
                if (!user) throw Error ('Wrong credentials.')
                data.id = user._id.toString()
                data.token = `token-${Math.random()}`
                return data
            })
    } */

    authenticateUser(email, password) {
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user || user.password !== password) throw new Error(`Wrong credentials.`)

                return user._id.toString()
            })
    }
}
