const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { title, type, picture, address, passcode }, params: { id } } = req

    try {
        logic.registerSpace(title, type, picture, address, passcode, id)
            .then(() => res.status(201).json({ message: 'space registered successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}