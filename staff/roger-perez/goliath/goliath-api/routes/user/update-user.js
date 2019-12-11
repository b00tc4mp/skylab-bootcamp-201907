const logic = require('../../logic')

module.exports = function (req, res) {
    console.log('req in update :', req);
    const { params: { id }, body  } = req
    console.log('body in update :', body);
    try {
        logic.updateUser(id, body)
            .then(user => res.json({ message: 'user correctly updated', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}