const validate = require('../../../utils/validate')
const { User, Card } = require('../../../models')
/**
*
@param {string} id
@param {number} number
@param {Date} expiry
*
* @returns {Promise}
*/

module.exports = function (id, number, expiry) {
   validate.string(id, 'id')
   validate.number(number, 'card number')
   validate.date(expiry, 'expiry date')

   return (async () => {

      const user = await User.findById(id)
      if (!user) throw Error('User does not exists.')

      const existing = user.cards.some(({ number: _number }) => _number === number)

      if (existing) throw new Error('Card already exists')

      const card = new Card({ number, expiry })

      user.cards.push(card)

      await user.save()

      return card.id
   })()

}

