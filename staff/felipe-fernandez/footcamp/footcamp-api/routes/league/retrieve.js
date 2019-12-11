const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params:{ leagueId } } = req

    try {
        
       const league = await logic.retrieveLeague(id, leagueId)
           res.status(200).json({ message: 'League retrieved successfully', league})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}