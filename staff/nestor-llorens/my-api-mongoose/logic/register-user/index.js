const validate = require('../../utils/validate')
const { User } = require('../../data')

function registerUser (name, surname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)
            return User.create({ name, surname, email, password })
        })
        .then(() => { })
}

module.exports = registerUser