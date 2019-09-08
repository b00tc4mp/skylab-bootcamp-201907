const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code, id_player } } = req

    try {
        
       const player = await logic.retrievePlayer(id, code, id_player)
           res.status(200).json({ message: 'Player retrieved successfully', player})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}