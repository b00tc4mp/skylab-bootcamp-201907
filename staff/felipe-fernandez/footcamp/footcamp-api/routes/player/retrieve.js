const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code, playerId } } = req

    try {
        
       const player = await logic.retrievePlayer(id, code, playerId)
           res.status(200).json({ message: 'Player retrieved successfully', player})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}