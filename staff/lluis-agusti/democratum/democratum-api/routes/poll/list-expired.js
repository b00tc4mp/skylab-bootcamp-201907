const logic = require('../../logic')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {

    const { userId, params: {id: ciudad} } = req

    try {
        logic.listExpired(userId, ciudad, estado)
            .then(polls => res.json({ message: 'Approved polls list:', polls }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}