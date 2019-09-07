const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, league, body: { code } } = req

    try {
        
       const league = await logic.retrieveLeague(id, code)
           res.status(200).json({ message: 'League retrieved successfully', league})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}