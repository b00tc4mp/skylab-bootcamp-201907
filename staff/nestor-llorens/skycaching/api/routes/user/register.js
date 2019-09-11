const logic = require('../../logic/user')

module.exports = async function (req, res) {
    debugger
    const { body: { username, password, email, avatar } } = req

    try {
    
    await logic.registerUser(username, password, email, avatar)
    res.status(201).json({ message: 'user correctly registered' })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}
