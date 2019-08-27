const validate = require('../../utils/validate')

module.exports = function (email, password) {

    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    return this.__users__.findOne({ email, password })
        .then(user => {
            if (!user || user.password !== password) throw new Error(`Wrong credentials`)

            return { id: user._id.toString() }
        })
}