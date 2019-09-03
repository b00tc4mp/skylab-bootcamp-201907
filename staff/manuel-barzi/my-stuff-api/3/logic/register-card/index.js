const { models: { User, Card } } = require('my-stuff-data')
const { validate } = require('my-stuff-utils')

/**
 * Registers a card associated to a user.
 * 
 * @param {string} id 
 * @param {number} number 
 * @param {Date} expiry
 * 
 * @returns {Promise}
 */
module.exports = function (id, number, expiry) {
    validate.string(id, 'id')
    validate.number(number, 'number')
    validate.date(expiry, 'expiry')

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const existing = user.cards.some(({ number: _number }) => _number === number)

        if (existing) throw new Error(`user with id ${id} already has card number ${number}`)

        const card = new Card({ number, expiry })

        user.cards.push(card)

        await user.save()

        return card.id
    })()

}