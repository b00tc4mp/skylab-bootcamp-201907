const validate = require('utils/validate')
const { models: { User } } = require('data')

function registerUser (username, password, email, avatar) {

    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(avatar, 'avatar')

    favorites = []
    owned = []
    found = []

    return (async () => {
        
        let user = await User.findOne({ email })
        if (user) throw new Error(`user with e-mail ${email} already exists`)
        user = await User.findOne({ username })
        if (user) throw new Error(`user with username ${username} already exists`)

        user = await User.create({ username, password, email, avatar, favorites, owned, found })
        
        return user.id
        
    })()
}

module.exports = registerUser