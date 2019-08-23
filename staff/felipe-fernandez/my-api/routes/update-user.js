const logic = require('../logic')
 
module.exports = function (req, res) {
        const { params: { id }, body } = req
        try {
            // jwt.verify(token, secret)
            logic.updateUser(id, body)
                .then(() => res.json({ message: 'User modified successfully' }))
                .catch(({ message }) => res.status(400).json({ error: message }))
        } catch ({ message }) {
            res.status(404).json({ error: message })
        }
    }

