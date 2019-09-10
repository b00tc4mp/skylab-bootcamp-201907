const { registerWeek } = require('../../logic')

module.exports = function(req, res) {

    const { body: { monday, tuesday, wednesday, thursday, friday, saturday, sunday } } = req

    try {
        registerWeek(monday, tuesday, wednesday, thursday, friday, saturday, sunday)
            .then(() => res.status(201).json({ message: 'week registered successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}


