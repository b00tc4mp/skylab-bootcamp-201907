const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {name, code} } = req

    try {
        
       const lineup = await logic.lineUpTeam(id, code, name)
           res.status(200).json({ message: 'Team line up retrieved successfully', lineup})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}