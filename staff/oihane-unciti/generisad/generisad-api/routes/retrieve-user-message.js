const logic = require('../logic')

module.exports = (req, res) => { 
    const { userId, params: { merchant : domain } }= req

    try {
        logic.retrieveUserMessage(userId, domain)
            .then(mail => res.json({ message: 'mail retrieved correctly', mail }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}