const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params: {leagueId}, body: {code, name, points} } = req

    try {
        
       const players = await logic.createTeam(id, leagueId, code, name, points)
           res.status(200).json({ message: 'Team created successfully', players})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}