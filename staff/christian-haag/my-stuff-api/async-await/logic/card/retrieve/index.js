const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * 
 * @param {*} id
 * @returns {Promise}
 * 
 */

module.exports = function (userId, cardId) {

    validate.string(userId, 'userId')
    validate.string(cardId, 'cardId')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)

        const card = user.cards.find(card => card.id === cardId)
        if (!card) throw Error(`Card with id ${cardId} does not exist.`)

        return card

    })()
}