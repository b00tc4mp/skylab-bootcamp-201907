const {createPost} = require('../../logic')

module.exports = function (req, res) {
    const { body: { title, body, author } } = req

    try {
        createPost(title, body, author)
            .then(() => res.status(201).json({ message: 'post correctly created' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}