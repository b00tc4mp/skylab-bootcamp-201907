const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { idS, _body } } = req

    try {
        await homework.registerHomework(idS, _body)
        res.status(201).json({ message: 'homework correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}