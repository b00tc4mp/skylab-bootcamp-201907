const validate = require('utils/validate')
const { models: { User } } = require('data')

function registerUser (username, email, password, avatar) {

    validate.string(username, 'username')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(avatar, 'avatar')

    return (async () => {
        
        const user = await User.findOne({ email })
        if (user) throw new Error(`user with e-mail ${email} already exists`)
        await User.create({ username, email, password, avatar })

    })()
}

module.exports = registerUser