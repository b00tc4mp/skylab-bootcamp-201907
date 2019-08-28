const logic = require('../../logic')

module.exports = async function (req, res) {

    const { body: { address, m2, year, cadastre }, params: { id } } = req

    try {
        await logic.property.register(id, address, m2, year, cadastre)
        res.status(201).json({ message: 'Property registered successfully' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}