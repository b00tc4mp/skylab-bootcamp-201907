const validate = require('../../utils/validate')

module.exports = function(email, password) {
        let data = {}
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')

        return this.__users__.findOne({ email, password })
            .then(response => {
                if (!response) throw Error('Wrong credentials.')
                data.id = response._id.toString()
            })
    }