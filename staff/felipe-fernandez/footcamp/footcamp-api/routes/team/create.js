const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code, name, points} } = req

    try {
        
       await logic.createTeam(id, code, name, points)
           res.status(200).json({ message: 'Team created successfully'})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}