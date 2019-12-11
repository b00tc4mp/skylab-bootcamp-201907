const toggleFavorite = require('../../logic/user/toggle-favorite')

module.exports = async function (req, res) {

    const { userId, params: { dogId } } = req

    try {
        await toggleFavorite(userId, dogId)

        res.json({ message: 'favorite dog updated successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}