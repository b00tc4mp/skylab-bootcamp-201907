const logic = require('../../logic')
const bcrypt = require('bcryptjs')


module.exports = function(req, res) {

    const { body: { cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus } } = req

    try {
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
            .then(() => res.status(201).json({
                message: 'Poll created successfully. Thank you :-)' 
                }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}