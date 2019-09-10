const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params:{ leagueId } } = req

    try {
        
       await logic.leaveLeagues(id, leagueId)
           res.status(200).json({ message: 'Successfully left league'})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}