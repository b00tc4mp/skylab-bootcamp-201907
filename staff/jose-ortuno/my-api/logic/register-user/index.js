const validate = require('../../utils/validate')

module.exports = function(name, surname, email, password, repassword) {
    
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.email(email, 'email')
        validate.string(password, 'password')
        validate.string(repassword, 'repassword')

        if(password !== repassword) throw new Error('passwords do not match')

        return this.__users__.findOne( { email } )
            .then(user => {
                
                if(user) throw Error('Email already registered')
                return this.__users__.insertOne({ name, surname, email, password})
            }).then(() => {})
    }