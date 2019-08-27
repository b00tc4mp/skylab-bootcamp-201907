const { User, Card } = require('../../../data/index')
const validate = require('../../../utils/validate')


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
    validate.string(expiry, 'expiry')

    return User.findById(id)
        .then(user => {
            if (!user) throw new Error(`user with ${id} does not exist`)

            const exist = user.cards.some(({ number: _number }) => _number === number)
            if (exist) throw new Error(`card already exist`)

            const newCard = new Card({ cardBrand, cardType, number, expiry })

            user.cards.push(newCard)

            user.save()
            return newCard.id

        })
}
