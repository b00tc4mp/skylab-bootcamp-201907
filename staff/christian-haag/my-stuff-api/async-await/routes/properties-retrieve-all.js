const logic = require('../logic')

module.exports = async (req, res) => {

    const { params: { id } } = req

    try {
        await logic.retrieveAllProperty(id)
            .then(properties => res.json({ message: 'Properties retrieved correctly', properties }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

}

