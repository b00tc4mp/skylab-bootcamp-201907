const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User, Poll } = models

/**
 * Creates a new poll. Users with the role 'citizen' only can create polls with status 'pending'.
 * 
 *  
 * @param {String} cityId
 * @param {String} authorId
 * @param {String} question
 * @param {String} optionA
 * @param {String} optionB
 * @param {String} description
 * @param {Date} expiryDate
 * @param {String} imagePoll
 * @param {Number} positives
 * @param {Number} negatives
 * @param {String} pollStatus
 *
 * @returns {Promise}
 */

    // quiero que el userId se pushee al authorId



module.exports = function(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus) {

    validate.string(cityId, 'cityId')
    validate.string(authorId, 'authorId')
    validate.string(question, 'question')
    validate.string(optionA, 'optionA')
    validate.string(optionB, 'optionB')
    validate.string(description, 'description')
    //validate.date(expiryDate, 'expiryDate')
    validate.string(imagePoll, 'imagePoll')
    validate.number(positives, 'positives')
    validate.number(negatives, 'negatives')
    validate.string(pollStatus, 'pollStatus')
    
    return (async () => {

        let poll = await Poll.findOne({ question })
        if (poll) throw Error('Poll already exists.')

        // Hauria de buscar l'usuari i verificar que es admin --> status approved
        // Si no es admin el pollStatus queda amb pending

        poll = new Poll ({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus })

        await poll.save()

        return poll
    })()
}