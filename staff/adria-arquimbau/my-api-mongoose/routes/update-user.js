/* const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { id }, body  } = req

    try {
        logic.updateUser(id, body)
            .then(response => {
                if(response.result.nModified == 0)
                    res.json({ message: `User with id ${id} has the same params`, response})
                else
                    res.json({ message: `User with id ${id} correctly updated`, response})
            })
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
} */

const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { id }, body  } = req

    try {
        logic.updateUser(id, body)
            .then(() => res.json({ message: 'user correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}