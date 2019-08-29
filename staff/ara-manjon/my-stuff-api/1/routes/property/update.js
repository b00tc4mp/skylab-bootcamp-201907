const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { propertyId }, body } = req

    try {
        logic.property.update(propertyId, body)
            .then(() => res.json({ message: 'Property updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
        } catch({ message }) {
                res.status(404).json({ error: message })
        }
}


