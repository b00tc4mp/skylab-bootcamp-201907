const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { params: { name } } = req

    try {
       const result = await subject.retrieveSubject(name)
        res.status(201).json({ message: 'subject correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}