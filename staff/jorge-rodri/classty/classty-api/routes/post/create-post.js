const { post } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { idSub, _body } } = req

    try {
        await post.createPost(idSub, _body)
        res.status(201).json({ message: 'post correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}