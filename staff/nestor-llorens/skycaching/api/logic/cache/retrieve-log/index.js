const validate = require('utils/validate')
const { models: { User } } = require('data')

function retrieveLog(userId) {
    
    validate.string(userId, 'user id')

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)

        user.found.forEach(item => {
            item.id = item._id.toString()
        })
        
        return user.found

    })()
}

module.exports = retrieveLog