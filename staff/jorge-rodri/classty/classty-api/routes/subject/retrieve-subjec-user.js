const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { id } } = req

    try {
       const result = await subject.retrieveAllSubjectToStudent(id)
        res.status(201).json({ message: 'subject correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}