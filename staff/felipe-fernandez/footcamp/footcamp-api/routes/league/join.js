const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code} } = req

    try {
        
       const leagueId = await logic.joinLeague(id, code)
           res.status(200).json({ message: 'Joined to league successfully', leagueId})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}