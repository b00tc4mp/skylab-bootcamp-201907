const { retrieveDay } = require('../../logic')

module.exports = async (req, res) => {

    const { userId, params: { id } } = req

    try {
        const day = await retrieveDay(userId)
        res.json({ message: 'day retrieved correctly', day })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

}


