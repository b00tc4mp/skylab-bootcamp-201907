const validate = require('../../utils/validate')
const { User } = require('../../data')

function authenticateUser (email, password) {
    
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new Error(`user with e-mail ${email} does not exist`)

            if (user.password !== password) throw new Error('wrong credentials')    

            return user.id
        })
}

module.exports = authenticateUser