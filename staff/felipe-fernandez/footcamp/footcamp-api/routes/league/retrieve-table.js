const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params:{ leagueId } } = req


    try {
        
       const teams = await logic.retrieveTable(id, leagueId)
           res.status(200).json({ message: 'All teams retrieved successfully', teams})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}