const logic = require('../../logic')

module.exports = async function(req, res) {


    const { params: { id }, body: { email, password } } = req

    try {
        
        await logic.user.unregister(id, email, password)
         res.json({ message: 'User unregistered successfully'})
            
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
