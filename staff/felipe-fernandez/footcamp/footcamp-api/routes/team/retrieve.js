const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params:{ leagueId, teamId} } = req

    try {
        
       const team = await logic.retrieveTeam( id, leagueId, teamId)
           res.status(200).json({ message: 'Team retrieved successfully', team})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}