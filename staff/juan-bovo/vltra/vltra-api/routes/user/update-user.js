const { updateUser} = require('../../logic')

module.exports = function (req, res) {
    // const { params: { id }, body  } = req
    const { id, body } = req

    try {
        updateUser(id, body)
            .then(() => res.json({ message: 'user correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}