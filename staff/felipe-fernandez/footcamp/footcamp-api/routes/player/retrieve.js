const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, params: {playerId } } = req

    try {
        
       const player = await logic.retrievePlayer(id, playerId)
           res.status(200).json({ message: 'Player retrieved successfully', player})
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}