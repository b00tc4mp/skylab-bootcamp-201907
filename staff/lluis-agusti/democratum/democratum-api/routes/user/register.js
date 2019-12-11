const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole } } = req

    try {
        logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
            .then(() => res.status(201).json({ message: 'User registered successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}