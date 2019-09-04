const logic = require('../../logic')

module.exports = async function(req, res) {

    const { params: { id }, body } = req

    try {
        await logic.user.update(id, body)
        res.json({ message: 'User updated successfully'})
           
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}


