const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: { code } } = req

    try {
        
       const teams = await logic.retrieveAllLeagues(id, code)
           res.status(200).json({ message: 'All teams retrieved successfully', teams})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}