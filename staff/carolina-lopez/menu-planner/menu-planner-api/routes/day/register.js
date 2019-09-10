const { registerDay } = require('../../logic')

module.exports = function(req, res) {

    const { body: {breakfast, lunch, snack, dinner } } = req

    try {
        registerDay(breakfast, lunch, snack, dinner)
            .then(() => res.status(201).json({ message: 'day registered successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}