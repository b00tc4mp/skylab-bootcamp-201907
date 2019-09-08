const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code, name} } = req

    try {
        
       const players = await logic.deleteTeam(id, code, name)
           res.status(200).json({ message: 'Team created successfully'})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}