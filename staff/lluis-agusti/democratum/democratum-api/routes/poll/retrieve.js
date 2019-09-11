const logic = require('../../logic')

module.exports = (req, res) => {

    const { pollId } = req // o con { params: { pollId } }

    try {
        logic.retrievePoll(pollId)
            .then(poll => res.json({ message: 'Poll retrieved correctly', poll }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

}

const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.retrieveUser(userId)
            .then(user => res.json({ message: 'citizen retrieved correctly', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

}