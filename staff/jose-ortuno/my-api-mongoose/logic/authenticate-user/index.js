const validate = require('../../utils/validate')
const { User } = require('../../data')

module.exports = function (email, password) {

    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    return User.findOne({ email, password })
        .then(user => {
            if (!user || user.password !== password) throw new Error(`Wrong credentials`)

            return { id: user._id.toString() }
        })
}