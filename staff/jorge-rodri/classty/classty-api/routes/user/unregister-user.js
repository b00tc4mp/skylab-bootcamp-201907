const { users } = require('../../logic')

module.exports = async (req, res) => {
    const { userId } = req
debugger
    try {
        debugger
        await users.unregisterUser(userId)
        res.status(201).json({ message: 'user correctly unregistered' })
            
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}