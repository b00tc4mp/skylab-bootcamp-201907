const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id, body: {code} } = req

    try {
        
       await logic.joinLeague(id, code)
           res.status(200).json({ message: 'Joined to league successfully'})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}