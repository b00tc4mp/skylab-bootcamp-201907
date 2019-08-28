const validate = require('../../../utils/validate')
const { User, Card } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} userId 
 * @param {string} cardId 
 * 
 * @returns {Promise}
*/

module.exports = function(userId, cardId) {

    validate.string(userId, 'User ID')
    validate.string(cardId, 'Card ID')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`User with id ${cardId} does not exist.`)
            const match = user.cards.find(card => card.id === cardId)
            if (!match) throw new Error(`Card with id ${cardId} does not exist.`)
            user.cards.splice(user.cards.indexOf(match), 1)
            return user.save()
        }).then(() => { })
}