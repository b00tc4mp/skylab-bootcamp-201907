const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params:{ leagueId, teamId } } = req

    try {
        
       await logic.deleteTeam(id, leagueId, teamId)
           res.status(200).json({ message: 'Team deleted successfully'})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}