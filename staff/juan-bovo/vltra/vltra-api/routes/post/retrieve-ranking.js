const {retrieveRanking } = require('../../logic')

module.exports = (req, res) => {
    //const { params: { id } } = req
    const { id } = req
    
    try {
        retrieveRanking()
            .then(ranking => res.json({ message: 'ranking retrieved correctly', ranking }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}