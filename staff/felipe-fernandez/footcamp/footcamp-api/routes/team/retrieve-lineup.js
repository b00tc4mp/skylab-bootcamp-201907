const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params:{ leagueId, teamId} } = req

    try {
        
       const teamLineup = await logic.retrievelineUpTeam( id, leagueId, teamId)
           res.status(200).json({ message: 'Lineup retrieved successfully', teamLineup})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}