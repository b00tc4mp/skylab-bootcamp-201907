const validate = require('utils/validate')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

function registerUser (username, password, email) {

    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    favorites = []
    owned = []
    found = []

    return (async () => {
        
        let user = await User.findOne({ email })
        if (user) throw new Error(`user with e-mail ${email} already exists`)
        user = await User.findOne({ username })
        if (user) throw new Error(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)

        user = await User.create({ username, password: hash, email, favorites, owned, found })
        
        return user.id
        
    })()
}

module.exports = registerUser