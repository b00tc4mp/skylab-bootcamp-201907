const logic = require('../../logic')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId, params: {id: ciudad} } = req

    try {
        logic.listAll(userId, ciudad)
            .then(polls => res.json({ message: 'Polls retrieved correctly', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
