const logic = require('../../logic')

module.exports = async function(req, res) {

    const { params: { id } } = req
    debugger

    try {
        const user = await logic.user.retrieve(id)
        res.json({ message: 'user retrieved correctly', user })
            
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

