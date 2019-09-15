const {createPost} = require('../../logic')

module.exports = function (req, res) {
    const { id, body: { title, body } } = req
    debugger
    try {
        createPost(id, title, body)
            .then(() => res.status(201).json({ message: 'post correctly created' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}