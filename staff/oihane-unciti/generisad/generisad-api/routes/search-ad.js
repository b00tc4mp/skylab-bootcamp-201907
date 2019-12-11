const logic = require('../logic')

module.exports = (req, res) => {

    const { query: { query, domain } } = req

    
    try {
       
        logic.searchAd(query, domain)
            .then(ad => res.json({ message: 'ad retrieved correctly', ad }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        console.log(message)
        res.status(404).json({ error: message })
    }
}