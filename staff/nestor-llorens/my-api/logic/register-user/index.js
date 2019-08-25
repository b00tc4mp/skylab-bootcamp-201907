const validate = require('../../utils/validate')

function registerUser (name, surname, email, password) {
    debugger
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return this.__users__.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return this.__users__.insertOne({ name, surname, email, password })
        })
        .then(() => { })
}

module.exports = registerUser