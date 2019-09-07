const logic = require('../../logic')

module.exports = async function(req, res) {

    const { name, idPlayer }  = req

    try {
        
       await logic.createLeague(id, idPlayer)
           res.status(200).json({ message: 'Player retrieved successfully'})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}