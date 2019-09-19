const logic = require('../logic')

module.exports = (req, res) => {

    const { userId, params:{id} } = req
    try {
        logic.toggleUserFav(userId, id )
            .then(() => res.status(201).json({ message: 'ad correctly add' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}