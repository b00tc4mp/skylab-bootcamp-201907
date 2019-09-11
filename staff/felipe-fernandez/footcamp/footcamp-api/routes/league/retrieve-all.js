const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id } = req


    try {
        
       const leagues = await logic.retrieveAllLeagues(id)
           res.status(200).json({ message: 'All leagues retrieved successfully', leagues})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}