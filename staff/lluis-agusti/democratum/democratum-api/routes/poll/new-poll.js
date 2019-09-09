const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus }, params: { id } } = req

    try {
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
            .then(() => res.status(201).json({
                message: 'Poll created successfully. Poll Id: ' + id 
                }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}