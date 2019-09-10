const { exam } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { idSub, _body } } = req

    try {
        await exam.registerExam(idSub, _body)
        res.status(201).json({ message: 'exam correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}