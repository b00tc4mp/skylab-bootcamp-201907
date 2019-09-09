const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { spaceId, coUserId } } = req

    try {
        logic.registerSpaceCouser(spaceId, coUserId)
            .then(() => res.json({ message: `user with id ${coUserId} added to space ${spaceId} successfully`}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
