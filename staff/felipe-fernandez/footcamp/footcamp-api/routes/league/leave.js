const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code} } = req

    try {
        
       await logic.leaveLeagues(id, code)
           res.status(200).json({ message: 'Successfully left league'})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}