const retrieveDog = require('../../logic/dog/retrieve-dog')

module.exports = async function (req, res) {

    const { params: { dogId } } = req

    try {
        const dog = await retrieveDog(dogId)
        res.json({ message: 'dog retrieved correctly', dog })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}