const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {name, code} } = req

    try {
        
       const team = await logic.retrieveTeam(id, code, name)
           res.status(200).json({ message: 'Team retrieved successfully', team})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}