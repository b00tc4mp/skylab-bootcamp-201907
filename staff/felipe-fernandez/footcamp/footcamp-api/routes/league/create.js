const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {name, code} } = req

    try {
        
       await logic.createLeague(id, name, code)
           res.status(200).json({ message: 'League created successfully', code})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}