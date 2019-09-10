const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { idS } } = req

    try {
        const result = await homework.retrieveAll(idS)
        res.status(201).json({ message: 'homeworks correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}