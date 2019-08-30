const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { id }, body: { address, sqm, yearOfConstruction, cadastre, mortgage } } = req
    try {
        logic.registerProperty(id, address, sqm, yearOfConstruction, cadastre, mortgage)
            .then(() => res.status(201).json({ message: 'property correctly added' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}
