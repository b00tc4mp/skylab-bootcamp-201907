const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { name, surname, id } } = req

    try {
        await subject.addStudent( name, surname, id)
        res.status(201).json({ message: 'student correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}