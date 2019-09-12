const validate = require('utils/validate')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')


function authenticateUser (username, password) {
    
    validate.string(username, 'username')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ username })
    
        if (!user) throw new Error(`user with username ${username} does not exist`)
        
        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new Error('wrong credentials')
    
        return user.id
    })()
}

module.exports = authenticateUser