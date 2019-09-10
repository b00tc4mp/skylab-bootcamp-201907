const retrieveFavorites = require('../../logic/user/retrieve-favorites')

module.exports = async function (req, res) {

    const { params: { id } } = req

    try {
        const favorites = await retrieveFavorites(id)
        res.json({ message: 'user favorites retrieved correctly', favorites })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}