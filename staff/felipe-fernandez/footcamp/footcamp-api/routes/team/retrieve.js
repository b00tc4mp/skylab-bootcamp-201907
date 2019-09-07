const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {name, code, points} } = req

    try {
        
       await logic.createLeague(id, code, name, points)
           res.status(200).json({ message: 'Team retrieved successfully'})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}