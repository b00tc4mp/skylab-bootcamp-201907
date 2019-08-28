const { property } = require('../../logic')

module.exports = function (req, res) {
    const { params: { id }, body: { address, m2, year, cadastre, owners=[] } } = req
    owners.unshift(id)
    try {
        property.registerProperty(address, m2, year, cadastre, owners )
            .then((cadastre) => {
                res.status(201).json({ message: 'propert correctly registered', cadastre })})
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}