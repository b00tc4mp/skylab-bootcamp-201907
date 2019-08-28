const mongoose = require('mongoose')
const validate = require('../../../utils/validate')
const { User, Card } = require('../../../data')

/**
 * Checks if user exist and add card . 
 * *If user _id match, new card is added
 * *if user _id don't match, error is thrown. Same for cards.
 * 
 * @param {string} cardBrand
 * @param {string} cardType
 * @param {number} number
 * @param {dat} expiry
 * 
 * @returns {Promise}
 */
module.exports = function (id, cardBrand, cardType, number, expiry) {
    validate.string(id, 'id')
    validate.string(cardBrand, 'cardBrand')
    validate.string(cardType, 'cardType')
    validate.number(number, 'number')
    validate.date(expiry, 'expiry')

    return (async () => {

        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exist`)

        const existing = user.cards.some(({ number: _number }) => _number === number)

        if (existing) throw new Error(`card number ${number} already exist`)

        const card = new Card({ cardBrand, cardType, number, expiry })

        user.cards.push(card)

        await user.save()

        return card.id

    })()

}
