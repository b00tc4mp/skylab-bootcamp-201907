const retrieveFavorites = require('../../logic/user/retrieve-favorites')

module.exports = async function (req, res) {

    const { userId } = req

    try {
        const favorites = await retrieveFavorites(userId)
        res.json({ message: 'user favorites retrieved correctly', favorites })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}