const { user } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { name, surname, email, password, card=[] } } = req

    try {
        await user.registerUser(name, surname, email, password, card)
        res.status(201).json({ message: 'user correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}