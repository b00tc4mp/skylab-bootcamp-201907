const { User, Card } = require('../../data/models')

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
    // TODO validate fields

    return User.findById(id)
        .then(user => {
            if (!user) throw new Error(`user with id ${id} does not exists`)

            const existing = user.cards.some(({ number: _number }) => _number === number)

            if (existing) throw new Error(`user with id ${id} already has card number ${number}`)

            user.cards.push(new Card({ number, expiry }))

            return user.save()
        })
        .then(() => { })
}