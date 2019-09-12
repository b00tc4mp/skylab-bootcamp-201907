const validate = require('utils/validate')
const { models: { User } } = require('data')

function authenticateUser (username, password) {
    
    validate.string(username, 'username')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ username })
    
        if (!user) throw new Error(`user with username ${username} does not exist`)
    
        if (user.password !== password) throw new Error('wrong credentials')
    
        return user.id
    })()
}

module.exports = authenticateUser