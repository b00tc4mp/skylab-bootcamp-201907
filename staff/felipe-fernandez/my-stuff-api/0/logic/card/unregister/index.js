const validate = require('../../../utils/validate')
const { User } = require('../../../models')
/**
 * Unregisters a user by their id
 * 
 * @param {string} userId 
 * @param {string} cardId 
 * 
 * @returns {Promise}
*/
module.exports = function (userId, cardId) {
    return User.findById(userId)
        .then(response => {
            if (!response) throw Error(`User with id ${userId} does not exist.`)
            const cardFound = response.cards.find(card => card.id === cardId)
            if (!cardFound) throw Error(`Card with id ${cardId} not found`)
            response.cards.splice(response.cards.indexOf(cardFound, 1))
            return response.save()
        }).then(() => { })
}