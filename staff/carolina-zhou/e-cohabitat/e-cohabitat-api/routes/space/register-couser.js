const logic = require('../../logic')

module.exports = (req, res) => {
    
    const { params: { id, spaceId }, body: { email, passcode } } = req
    
    try {
        logic.registerSpaceCouser(email, passcode, spaceId, id)
            .then(() => res.json({ message: `user with email ${email} added to space ${spaceId} successfully`}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
