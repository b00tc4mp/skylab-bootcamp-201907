const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params: {leagueId}, body: {name} } = req

    try {
        
       const players = await logic.createTeam(id, name, leagueId)
           res.status(200).json({ message: 'Team created successfully', players})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}