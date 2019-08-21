const validate = require('../../utils/validate')

module.exports = {

    authenticateUser(email, password) {
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(email, 'password')

        return this.__users__.findOne({ email })
            .then(user => {
                if ((!user) || (user.password != password)) throw Error('Wrong credentials')
            }
            )
    }
}

