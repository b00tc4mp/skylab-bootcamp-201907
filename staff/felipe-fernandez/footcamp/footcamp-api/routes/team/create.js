const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code, name, points} } = req

    try {
        
       const players = await logic.createTeam(id, code, name, points)
           res.status(200).json({ message: 'Team created successfully', players})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}