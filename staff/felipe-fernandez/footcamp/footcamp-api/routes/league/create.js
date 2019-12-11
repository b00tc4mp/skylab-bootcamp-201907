const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {name, code} } = req

    try {
        
       const leagueId = await logic.createLeague(id, name, code)
           res.status(200).json({ message: 'League created successfully', leagueId})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}