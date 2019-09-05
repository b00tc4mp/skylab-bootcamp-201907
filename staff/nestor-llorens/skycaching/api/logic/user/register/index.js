const validate = require('../../../../utils/validate')
const { User } = require('../../../../data')

function registerUser (name, surname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        
        const user = await User.findOne({ email })
        if (user) throw new Error(`user with e-mail ${email} already exists`)
        await User.create({ name, surname, email, password })

    })()
}

module.exports = registerUser