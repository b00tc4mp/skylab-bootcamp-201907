// const { validate } = require('../utils/validate')

module.exports = {
    registerUser(name, surname, email, password) {
        // validate.string(name, 'name')
        // validate.string(surname, 'surname')
        // validate.string(username, 'username')
        // validate.email(username, 'username')
        // validate.string(password, 'password')

        return this.__users__.findOne({ email })
            .then(user => {
                if (user) throw error
                return this.__users__.insertOne({ name, surname, email, password })
            })
            .catch(error => error)
    },

    authenticateUser(email, password) {
        let auth
        return this.__users__.findOne({ email, password })
            .then(response => {
                if (!response) throw Error('User already exists')
                data.id = response._id.toString()
                data.token = `Tokenazo-${Math.random() * 100000000}`

            })
            .catch(error => error)
    }
}

