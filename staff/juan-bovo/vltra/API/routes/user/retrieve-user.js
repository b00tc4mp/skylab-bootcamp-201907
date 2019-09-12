const {retrieveUser} = require('../../logic')

module.exports = (req, res) => {
    //const { params: { id } } = req
    const { id } = req
    
    try {
        retrieveUser(id)
            .then(user => res.json({ message: 'user retrieved correctly', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}