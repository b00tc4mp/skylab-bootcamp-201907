const logic = require('../../logic')

module.exports = async function(req, res) {

    const { id } = req

    try {
        const user = await logic.retrieveUser(id)
        res.json({ message: 'user retrieved correctly', user })
            
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

