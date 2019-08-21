const validate = require('../../utils/validate')

module.exports = {
    registerUser(name, surname, email, password, repassword) {
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')
        validate.string(repassword, 'password repeat')

        if (password !== repassword) throw new Error('passwords do not match')

        return this.__users__.findOne({ email })
            .then(user => {
                if (user) throw Error('Email is already registered')

                this.__users__.insertOne({ name: `${name}`, surname: `${surname}`, email: `${email}`, password: `${password}` })
            }
            )
    }
}


