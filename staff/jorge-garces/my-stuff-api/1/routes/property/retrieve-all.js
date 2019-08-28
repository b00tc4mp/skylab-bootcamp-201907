const logic = require('../../logic')

module.exports = async (req, res) => {

    const { params: { id } } = req

    try {
        const properties = await logic.property.retrieveAll(id)
        res.json({ message: 'Properties retrieved correctly', properties })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}