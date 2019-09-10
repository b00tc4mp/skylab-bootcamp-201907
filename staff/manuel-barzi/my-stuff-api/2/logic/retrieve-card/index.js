const { User } = require('../../data/models')
const mongoose = require('mongoose')

/**
 * Retrieves a card by its user id and itself id.
 * 
 * @param {string} id 
 * @param {string} cardId
 * 
 * @returns {Promise}
 */
module.exports = function (id, cardId) {
    // TODO validate fields

    return (async () => {
        const user = await User.findById(id).lean()

        if (!user) throw new Error(`user with id ${id} not found`)

        const { cards } = user

        const card = cards.find(card => card._id.toString() === cardId)

        if (!card) throw new Error(`card with id ${cardId} not found in user with id ${id}`)

        card.id = card._id.toString()
        
        delete card._id

        return card
    })()
}