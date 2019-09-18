const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {in: id1, out: id2}, params:{ leagueId, teamId} } = req
debugger
    try {
        
       await logic.updateTeam( id, leagueId, teamId ,id1, id2)
           res.status(200).json({ message: 'Team updated successfully'})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}