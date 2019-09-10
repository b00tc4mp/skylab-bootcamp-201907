const toggleFavorite = require('../../logic/user/toggle-favorite')

module.exports = async function (req, res) {

    const { params: { id, dogId } } = req

    try {
        await toggleFavorite(id, dogId)
        res.json({ message: 'favorite dog updated successfully' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}