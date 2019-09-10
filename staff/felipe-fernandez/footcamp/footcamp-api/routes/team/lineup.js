const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id,  params:{ leagueId,  teamId} } = req

    try {
        
       const lineup = await logic.lineUpTeam(id,leagueId, teamId )
           res.status(200).json({ message: 'Team line up retrieved successfully', lineup})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}