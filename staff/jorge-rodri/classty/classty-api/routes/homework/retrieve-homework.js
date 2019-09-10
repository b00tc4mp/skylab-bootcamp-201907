const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { params: { idS, idH } } = req

    try {
        const result = await homework.retrieveHomework(idS, idH)
        res.status(201).json({ message: 'homework correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}