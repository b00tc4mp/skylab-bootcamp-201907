const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const {  userId, body: { name, surname, id } } = req

    try {
        await subject.addTeacher(userId, name, surname, id)
        res.status(201).json({ message: 'teacher correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}