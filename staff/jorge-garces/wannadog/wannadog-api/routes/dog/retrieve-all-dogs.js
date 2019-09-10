const retrieveAllDogs = require('../../logic/dog/retrieve-all-dogs')

module.exports = async function (req, res) {

    const { params: { id } } = req

    try {
        const dogs = await retrieveAllDogs(id)
        res.json({ message: 'dogs retrieved correctly', dogs })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}