const retrieveAllDogs = require('../../logic/dog/retrieve-all-dogs')

module.exports = async function (req, res) {

    const { userId } = req

    try {
        const dogs = await retrieveAllDogs(userId)
        res.json({ message: 'dogs retrieved correctly', dogs })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}