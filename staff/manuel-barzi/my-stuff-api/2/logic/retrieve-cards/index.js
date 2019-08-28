const { User } = require('../../data/models')
const mongoose = require('mongoose')

/**
 * Retrieves the cards by their user id.
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 */
module.exports = function (id, cardId) {
    // TODO validate fields

    return (async () => {
        const user = await User.findById(id).lean()

        if (!user) throw new Error(`user with id ${id} not found`)

        const { cards } = user

        cards.forEach(card => {
            card.id = card._id.toString()

            delete card._id
        })

        return cards
    })()
}